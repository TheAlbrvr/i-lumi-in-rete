I LUMI IN RETE — VOLTAIRE
==========================

CONTENUTO
- index.html    Introduzione teorica, biografia, opere, pensiero, attualità e fonti.
- dialogo.html  Dialogo interattivo con 10 domande predefinite.
- quiz.html     Quiz a risposta multipla con feedback, punteggio e riepilogo.
- style.css    Stile responsive condiviso.
- script.js    Interazioni del dialogo e del quiz.

COME AVVIARE
1. Estrai la cartella dal file ZIP.
2. Puoi aprire index.html direttamente per consultare il sito e usare il dialogo a domande predefinite.
3. Per l’assistente IA locale, avvia un server nella cartella del progetto:
  py -m http.server 8000
  Poi apri http://localhost:8000 con un browser aggiornato.
4. Al primo uso dell’assistente serve Internet per scaricare il modello (circa 23 MB).
  Le domande successive vengono elaborate nel browser e non inviate a un server.
5. Per provarlo su un telefono collegato alla stessa rete Wi-Fi, avvia invece:
  py -m http.server 8000 --bind 0.0.0.0
  Apri sul telefono http://INDIRIZZO-IP-DEL-PC:8000. Il firewall potrebbe chiedere
  di consentire la connessione. Il modello richiede Internet al primo utilizzo.

COME INSERIRE IL RITRATTO
1. Crea una cartella chiamata "assets" dentro la cartella del progetto.
2. Inserisci al suo interno il ritratto scelto e chiamalo "voltaire.jpg".
3. Il percorso è già impostato in dialogo.html:
   assets/voltaire.jpg
   In alternativa modifica il valore dell'attributo src nell'elemento img.
4. Usa un'immagine di cui possiedi i diritti o che sia in pubblico dominio.
   Aggiungi una fonte/attribuzione se richiesta dalla licenza.

PERSONALIZZAZIONE
- Modifica i colori e le dimensioni in style.css.
- Modifica le risposte del dialogo e le domande del quiz in script.js.
- I testi della pagina teorica sono direttamente in index.html.

NOTE
- La grafica importa i font DM Sans e Playfair Display da Google Fonts.
  Se non è disponibile Internet, il sito usa font di sistema alternativi.
- Il sito non usa framework; l’assistente carica Transformers.js e un modello
  semantico leggero solo quando viene inviata la prima domanda.
- L’assistente non genera testo: abbina la domanda libera ai contenuti verificati
  del dialogo e mostra la risposta storica più pertinente. L’inferenza avviene
  sul dispositivo; libreria e modello vengono scaricati da Internet al primo uso.
- Il dialogo è una simulazione didattica: non attribuisce a Voltaire frasi inventate.
- Le citazioni testuali sono accompagnate da opera e capitolo. La frase spesso
  attribuita a Voltaire sulla difesa del diritto di parola è segnalata come
  formulazione successiva, non come citazione autentica.
- Le fonti online sono indicate nella sezione finale di index.html. Prima della
  consegna scolastica, verifica i contenuti e le citazioni sulle fonti originali.
