const form = document.getElementById("assistant-form");

if (form) {
  const questionInput = document.getElementById("assistant-question");
  const status = document.getElementById("assistant-status");
  const submitButton = form.querySelector("button[type='submit']");
  const answer = document.getElementById("dialogue-answer");
  const reference = document.getElementById("dialogue-reference");
  const questionButtons = [...document.querySelectorAll("#dialogue-questions button[data-question]")];
  let extractorPromise;
  let candidateVectors;

  function updateStatus(message, state = "") {
    status.textContent = message;
    status.dataset.state = state;
  }

  async function getExtractor() {
    if (!extractorPromise) {
      extractorPromise = import("https://cdn.jsdelivr.net/npm/@huggingface/transformers@3.7.2")
        .then(({ pipeline }) => pipeline("feature-extraction", "Xenova/all-MiniLM-L6-v2", {
          device: "wasm",
          dtype: "q8",
          progress_callback: event => {
            if (event.status === "progress" && Number.isFinite(event.progress)) {
              updateStatus(`Download del modello: ${Math.round(event.progress)}%`);
            }
          }
        }))
        .catch(error => {
          extractorPromise = undefined;
          throw error;
        });
    }
    return extractorPromise;
  }

  function cosineSimilarity(left, right) {
    let score = 0;
    for (let index = 0; index < left.length; index++) score += left[index] * right[index];
    return score;
  }

  function keywordOverlap(question, candidate) {
    const getKeywords = text => new Set(
      text.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase()
        .match(/[a-z0-9]+/g)?.filter(term => term.length > 3) ?? []
    );
    const questionTerms = getKeywords(question);
    if (!questionTerms.size) return 0;
    const candidateTerms = getKeywords(candidate);
    let matches = 0;
    questionTerms.forEach(term => {
      if (candidateTerms.has(term)) matches++;
    });
    return matches / questionTerms.size;
  }

  form.addEventListener("submit", async event => {
    event.preventDefault();
    const question = questionInput.value.trim();
    if (!question) return;

    submitButton.disabled = true;
    updateStatus("Avvio dell’assistente locale…");

    try {
      const extractor = await getExtractor();
      const prompts = questionButtons.map(button => button.querySelector("span").textContent.trim());
      if (!candidateVectors) {
        updateStatus("Preparo i temi del dialogo sul dispositivo…");
        const corpus = await extractor(prompts, { pooling: "mean", normalize: true });
        candidateVectors = corpus.tolist();
      }

      const queryEmbedding = await extractor(question, { pooling: "mean", normalize: true });
      const queryVector = queryEmbedding.tolist();
      let bestIndex = 0;
      let bestScore = -Infinity;
      candidateVectors.forEach((vector, index) => {
        const answerIndex = Number(questionButtons[index].dataset.question);
        const answerText = window.dialogueAnswers?.[answerIndex]?.text ?? "";
        const candidate = `${prompts[index]} ${answerText}`;
        const score = cosineSimilarity(vector, queryVector) * 0.55 + keywordOverlap(question, candidate) * 0.45;
        if (score > bestScore) {
          bestIndex = index;
          bestScore = score;
        }
      });

      const answerIndex = Number(questionButtons[bestIndex].dataset.question);
      const item = window.dialogueAnswers?.[answerIndex];
      if (!item) throw new Error("Risposta non disponibile");

      answer.textContent = item.text;
      reference.textContent = item.ref;
      questionButtons.forEach((button, index) => {
        const selected = index === bestIndex;
        button.classList.toggle("selected", selected);
        button.setAttribute("aria-pressed", String(selected));
      });
      updateStatus(`Tema più pertinente: “${prompts[bestIndex]}” · risposta tratta dai contenuti verificati.`, "success");
    } catch (error) {
      console.error("Assistente locale non disponibile:", error);
      updateStatus("Non riesco a caricare il modello. Verifica la connessione e apri il sito da un server locale; puoi comunque scegliere una delle domande qui sotto.", "error");
    } finally {
      submitButton.disabled = false;
    }
  });
}
