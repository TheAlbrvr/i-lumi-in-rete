/* I Lumi in rete — interazioni senza librerie esterne. */
document.addEventListener("DOMContentLoaded", () => {
  // Dialogo a scelta: le risposte sono ricostruzioni didattiche, non citazioni.
  const answers = [
    {
      text: "Mi chiamo François-Marie Arouet. Ho adottato il nome Voltaire nel 1718, dopo la mia prima prigionia alla Bastiglia. L’origine precisa dello pseudonimo è discussa: potrebbe essere un gioco di lettere legato al mio nome, ma non esiste una spiegazione certa. Preferisco essere giudicato per ciò che ho scritto e per le battaglie che ho condotto.",
      ref: "Riferimento: biografia; adozione dello pseudonimo nel 1718."
    },
    {
      text: "Sono nato a Parigi nel 1694 e sono morto nella stessa città nel 1778. Ho vissuto nel XVIII secolo, durante l’Illuminismo e sotto la monarchia francese. Ho conosciuto la censura, l’esilio e le corti europee: esperienze che mi hanno fatto osservare da vicino il rapporto tra cultura e potere.",
      ref: "Riferimento: cronologia biografica, 1694–1778."
    },
    {
      text: "Essere un philosophe non significa soltanto costruire teorie. Significa usare la ragione, l’osservazione e la scrittura per mettere in discussione pregiudizi, superstizioni e abusi. Il pensiero deve uscire dai libri e intervenire nella società: per questo ho scritto racconti, tragedie, saggi e lettere, e mi sono battuto per vittime di ingiustizie.",
      ref: "Riferimento: Stanford Encyclopedia of Philosophy, voce “Voltaire”; opere polemiche e campagne pubbliche."
    },
    {
      text: "Mio padre, François Arouet, desiderava per me una carriera più sicura, possibilmente nel diritto o nell’amministrazione; io aspiravo invece a diventare uomo di lettere. Al collegio gesuita Louis-le-Grand ricevetti una formazione classica, soprattutto nella lingua latina e nella retorica. Quella scuola mi diede strumenti culturali importanti, anche se in seguito criticai il dogmatismo e l’intolleranza di alcune istituzioni religiose. Non bisogna confondere la mia formazione dai gesuiti con un’adesione permanente alle loro posizioni.",
      ref: "Riferimento: Stanford Encyclopedia of Philosophy; Oxford Dictionary of National Biography."
    },
    {
      text: "La Bastiglia mi mostrò quanto il potere potesse colpire uno scrittore per le sue parole. Nel 1717 vi rimasi circa undici mesi; nel 1726 fui nuovamente imprigionato dopo il conflitto con il nobile Rohan e poi lasciai la Francia per l’Inghilterra. Quel soggiorno, dal 1726 al 1729, fu decisivo: osservai il Parlamento, la pluralità religiosa e la libertà del dibattito, e approfondii Locke e Newton. Il confronto mi aiutò a maturare come philosophe.",
      ref: "Riferimento: Oxford Dictionary of National Biography; Stanford Encyclopedia of Philosophy, sezione sul periodo inglese."
    },
    {
      text: "Cirey fu molto più di un rifugio. Dal 1734 vissi e lavorai a lungo con Émilie du Châtelet, studiosa di matematica, fisica e filosofia. La sua intelligenza e la sua preparazione scientifica furono fondamentali: leggemmo, discutemmo e studiammo Newton. Fu una collaborazione intellettuale intensa, nella quale Émilie non fu una semplice assistente, ma una pensatrice autonoma e di grande valore.",
      ref: "Riferimento: Stanford Encyclopedia of Philosophy; Voltaire Foundation, University of Oxford."
    },
    {
      text: "Ho cercato talvolta di avvicinare i sovrani, convinto che un principe istruito potesse promuovere riforme. Con Federico II di Prussia intrattenni una lunga corrispondenza e vissi alla sua corte a Potsdam dal 1750. Ma il rapporto si deteriorò: le tensioni personali e le divergenze mostrarono che un sovrano colto non per questo rinuncia al controllo e all’autoritarismo. La mia posizione non coincideva con la democrazia moderna: speravo spesso in riforme dall’alto, ma criticavo censura e arbitrio.",
      ref: "Riferimento: Voltaire Foundation; Stanford Encyclopedia of Philosophy. Distinzione sul dispotismo illuminato."
    },
    {
      text: "Il caso di Jean Calas è uno degli esempi più dolorosi. Calas era un commerciante protestante di Tolosa: nel 1762 fu condannato a morte, sulla base di un processo segnato da gravi pregiudizi e irregolarità, per l’uccisione del figlio. Mi informai, studiai gli atti e coinvolsi l’opinione pubblica. La famiglia fu riabilitata nel 1765. Da questa battaglia nacque anche il Trattato sulla tolleranza: la giustizia deve fondarsi sulle prove, non sull’odio religioso.",
      ref: "Riferimento: Ministère de la Justice francese, “L’affaire Calas”; Trattato sulla tolleranza (1763)."
    },
    {
      text: "Con Diderot e d’Alembert condivisi la difesa della cultura e dell’Encyclopédie, anche se non eravamo identici nelle idee. Con d’Alembert ebbi un rapporto di collaborazione particolarmente stretto. Con Rousseau, invece, il rapporto divenne conflittuale: divergevamo su teatro, società, religione e sul ruolo della civiltà. Gli illuministi non erano un gruppo uniforme: il confronto e anche il dissenso facevano parte del movimento.",
      ref: "Riferimento: Stanford Encyclopedia of Philosophy, voce “Voltaire”; studi sui rapporti tra Voltaire e Rousseau."
    },
    {
      text: "Se devo indicare una battaglia che riassume il mio impegno, scelgo quella per la riabilitazione di Jean Calas. Non perché sia stata l’unica, ma perché mostra il legame tra ragione e azione: ho cercato informazioni, contestato un giudizio ingiusto e mobilitato persone attraverso la scrittura. Il philosophe non deve limitarsi a deridere gli errori: quando può, deve contribuire a correggerli.",
      ref: "Riferimento: campagna Calas, 1762–1765; Trattato sulla tolleranza."
    }
  ];

  window.dialogueAnswers = answers;

  const questionBox = document.getElementById("dialogue-questions");
  if (questionBox) {
    const answer = document.getElementById("dialogue-answer");
    const reference = document.getElementById("dialogue-reference");
    questionBox.addEventListener("click", event => {
      const button = event.target.closest("button[data-question]");
      if (!button) return;
      const item = answers[Number(button.dataset.question)];
      if (!item) return;
      answer.textContent = item.text;
      reference.textContent = item.ref;
      questionBox.querySelectorAll("button").forEach(b => {
        b.classList.toggle("selected", b === button);
        b.setAttribute("aria-pressed", b === button ? "true" : "false");
      });
    });
  }

  // Quiz: feedback immediato, punteggio e riepilogo finale.
  const quizRoot = document.getElementById("quiz-card");
  if (!quizRoot) return;

  const questions = [
    {category:"BIOGRAFIA",q:"Qual era il vero nome di Voltaire?",options:["François-Marie Arouet","Jean-Jacques Rousseau","Charles-Louis de Secondat","Denis Diderot"],correct:0,why:"Voltaire nacque François-Marie Arouet a Parigi nel 1694. Adottò lo pseudonimo nel 1718."},
    {category:"FORMAZIONE",q:"In quale istituto studiò da ragazzo?",options:["Università di Oxford","Collegio gesuita Louis-le-Grand","Accademia di Berlino","Università di Ginevra"],correct:1,why:"Frequentò il collegio gesuita Louis-le-Grand a Parigi dal 1704 al 1711, dove ricevette una formazione classica."},
    {category:"BIOGRAFIA",q:"Quale esperienza contribuì alla sua maturazione intellettuale?",options:["Un viaggio in America","Il soggiorno in Inghilterra (1726–1729)","La partecipazione alla Rivoluzione francese","Un incarico diplomatico in Russia"],correct:1,why:"In Inghilterra osservò istituzioni, pluralità religiosa e dibattito scientifico; approfondì inoltre Locke e Newton."},
    {category:"ILLUMINISMO",q:"Che cosa caratterizza il philosophe secondo l'impegno di Voltaire?",options:["Accettare le tradizioni senza discuterle","Difendere ogni autorità religiosa","Usare ragione e scrittura per criticare pregiudizi e abusi","Evitare ogni intervento nella società"],correct:2,why:"Per Voltaire il pensiero doveva intervenire nella vita pubblica, esaminando criticamente superstizione, fanatismo e ingiustizie."},
    {category:"TOLLERANZA",q:"Quale vicenda è all'origine del Trattato sulla tolleranza?",options:["Il processo a Galileo","L'affare Jean Calas","La guerra dei Sette anni","La Rivoluzione americana"],correct:1,why:"Voltaire intervenne nel caso di Jean Calas, protestante condannato a Tolosa nel 1762; la famiglia fu riabilitata nel 1765."},
    {category:"OPERE",q:"Qual è il bersaglio principale dell'ironia di Candido?",options:["L'idea ingenua che tutto accada per il meglio","La ricerca scientifica sperimentale","La pluralità delle religioni","La traduzione dei testi classici"],correct:0,why:"Candido mette alla prova l'ottimismo filosofico di Leibniz nella sua versione semplificata: guerre, disastri e ingiustizie contraddicono spiegazioni troppo rassicuranti."},
    {category:"RAGIONE",q:"Quale atteggiamento Voltaire contrappone alla superstizione?",options:["Obbedienza cieca","Indifferenza verso i fatti","Esame critico, osservazione e confronto delle prove","Rifiuto di ogni forma di conoscenza"],correct:2,why:"Il suo spirito critico richiede di verificare argomenti e testimonianze, invece di accettare credenze solo per tradizione o autorità."},
    {category:"POTERE",q:"Quale descrizione del rapporto di Voltaire con Federico II è più corretta?",options:["Fu sempre un rapporto pacifico e senza contrasti","Collaborò per un periodo, ma il rapporto si deteriorò","Voltaire fu re di Prussia","Non ebbero mai alcun contatto"],correct:1,why:"Voltaire frequentò la corte di Potsdam dal 1750, ma il rapporto con Federico II si deteriorò e lasciò la Prussia nel 1753."},
    {category:"PENSIERO POLITICO",q:"Voltaire può essere definito un democratico nel senso contemporaneo?",options:["Sì, sosteneva il suffragio universale","Sì, voleva abolire ogni monarchia","No: spesso confidava in sovrani riformatori, pur criticando arbitri e censura","No, perché difendeva la censura"],correct:2,why:"Voltaire criticò l'assolutismo arbitrario ma in varie fasi guardò al sovrano illuminato. Non sostenne la democrazia contemporanea o la sovranità popolare."},
    {category:"EDUCAZIONE CIVICA",q:"Quale comportamento applica oggi lo spirito critico voltairiano alla disinformazione?",options:["Condividere subito ciò che conferma le proprie idee","Verificare autore, data, contesto e prove prima di condividere","Considerare false tutte le notizie","Affidarsi soltanto al numero di condivisioni"],correct:1,why:"L'applicazione contemporanea consiste nel verificare le fonti e le prove. È un uso attuale del metodo critico, non un'opinione di Voltaire su Internet."}
  ];

  let index = 0, score = 0, chosen = false;
  const counter = document.getElementById("question-counter");
  const progress = document.getElementById("progress-bar");
  const scoreLive = document.getElementById("score-live");
  const category = document.getElementById("question-category");
  const questionText = document.getElementById("question-text");
  const optionsBox = document.getElementById("answer-options");
  const feedback = document.getElementById("quiz-feedback");
  const next = document.getElementById("next-question");
  const result = document.getElementById("quiz-result");
  const review = [];

  function renderQuestion() {
    chosen = false;
    const item = questions[index];
    counter.textContent = `Domanda ${index + 1} di ${questions.length}`;
    progress.style.width = `${(index / questions.length) * 100}%`;
    scoreLive.textContent = `Punti: ${score}`;
    category.textContent = item.category;
    questionText.textContent = item.q;
    optionsBox.innerHTML = "";
    feedback.hidden = true;
    feedback.className = "quiz-feedback";
    next.hidden = true;
    item.options.forEach((option, i) => {
      const button = document.createElement("button");
      button.className = "answer-option";
      button.type = "button";
      button.textContent = option;
      button.addEventListener("click", () => chooseAnswer(i));
      optionsBox.appendChild(button);
    });
  }

  function chooseAnswer(selected) {
    if (chosen) return;
    chosen = true;
    const item = questions[index];
    const correct = selected === item.correct;
    if (correct) score++;
    review.push({question:item.q,selected:item.options[selected],correct:item.options[item.correct],ok:correct});
    [...optionsBox.children].forEach((button, i) => {
      button.disabled = true;
      if (i === item.correct) button.classList.add("correct");
      if (i === selected && !correct) button.classList.add("incorrect");
    });
    feedback.hidden = false;
    feedback.classList.toggle("wrong", !correct);
    feedback.innerHTML = `<strong>${correct ? "Esatto! Risposta corretta." : "Non proprio. La risposta corretta è: " + item.options[item.correct] + "."}</strong><span>${item.why}</span>`;
    scoreLive.textContent = `Punti: ${score}`;
    next.textContent = index === questions.length - 1 ? "Mostra il risultato →" : "Prossima domanda →";
    next.hidden = false;
  }

  function showResult() {
    quizRoot.hidden = true;
    document.querySelector(".quiz-meta").hidden = true;
    result.hidden = false;
    progress.style.width = "100%";
    document.getElementById("final-score").textContent = `${score}/${questions.length}`;
    document.getElementById("result-title").textContent = score >= 8 ? "Ottima preparazione!" : score >= 6 ? "Buon lavoro: ripassa qualche punto." : "È il momento di ripassare.";
    document.getElementById("result-message").textContent = score >= 8
      ? "Hai compreso bene i principali aspetti della vita e del pensiero di Voltaire. Continua a distinguere le sue idee storiche dagli sviluppi successivi."
      : score >= 6
      ? "Hai acquisito una buona base. Rileggi soprattutto i temi per cui hai avuto difficoltà e prova di nuovo."
      : "Rileggi la scheda introduttiva e il dialogo: poi ripeti il quiz per consolidare i concetti.";
    const reviewBox = document.getElementById("result-review");
    reviewBox.innerHTML = "<h3>Riepilogo delle risposte</h3>";
    review.forEach((r, i) => {
      const row = document.createElement("div");
      row.className = "review-row";
      const title = document.createElement("strong");
      title.textContent = `${i + 1}. ${r.ok ? "✓" : "✗"} ${r.question}`;
      const detail = document.createElement("span");
      detail.textContent = `La tua risposta: ${r.selected} · Corretta: ${r.correct}`;
      row.append(title, detail);
      reviewBox.appendChild(row);
    });
  }

  next.addEventListener("click", () => {
    if (index < questions.length - 1) { index++; renderQuestion(); }
    else showResult();
  });
  document.getElementById("restart-quiz").addEventListener("click", () => {
    index = 0; score = 0; review.length = 0;
    result.hidden = true;
    quizRoot.hidden = false;
    document.querySelector(".quiz-meta").hidden = false;
    renderQuestion();
  });
  renderQuestion();
});
