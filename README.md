# Adrian Musioł

Programista w obszarze AI, automatyzacji i analizy danych. Buduję systemy oparte na agentach LLM, integracje przez API oraz narzędzia do pracy z danymi. Dostępny do zleceń freelancerskich realizowanych zadaniowo.

Strona: [www.abmusiol.pl](https://www.abmusiol.pl) · E-mail: [info@abmusiol.com](mailto:info@abmusiol.com) · Portfolio: [github.com/Adymus112/adrian-musiol](https://github.com/Adymus112/adrian-musiol) · [LinkedIn](https://www.linkedin.com/in/adrian-musio%C5%82-a8a575367)

<!-- pdf:skip-start -->
Wersja PDF: [Adrian-Musiol-portfolio.pdf](Adrian-Musiol-portfolio.pdf), generowana poleceniem `node scripts/build-pdf.mjs`.
<!-- pdf:skip-end -->

## Obszary pracy

| Obszar | Zakres |
|---|---|
| AI / LLM | Agenci wyspecjalizowani w jednej roli, praca z API modeli językowych |
| Automatyzacje | Workflow, integracje systemów, komunikacja asynchroniczna |
| Analiza danych | SQL, Python, przygotowanie i interpretacja danych |
| Narzędzia deweloperskie | Skrypty, usługi pomocnicze, integracje przez API |

## Technologie

- Języki programowania: Python, JavaScript, SQL
- Frontend i prototypowanie: React, Angular, Streamlit, Figma
- Backend i komunikacja: FastAPI, REST API, WebSocket, szyna komunikatów NATS, Docker
- Dane: PostgreSQL (multi-tenant, RLS), Qdrant (baza wektorowa), Redis
- Głos: Porcupine, Faster Whisper, Piper
- Narzędzia: Git, GitHub

## Obecnie

- Uczę się AI governance, czyli zasad kontroli, nadzoru i odpowiedzialności przy systemach AI. W ADYMUS stosuję je w praktyce: operacje zapisu wymagają zatwierdzenia przez użytkownika.
- Pracuję w Figmie, Angularze, Reakcie i Streamlicie.

<!-- pdf:page-break -->
## Projekt główny: ADYMUS

Autorski system operacyjny dla mikroprzedsiębiorstw (JDG), sterowany głosem. Zastępuje klikanie w tradycyjnych systemach ERP komendami głosowymi, a pracę wykonują wyspecjalizowani agenci AI komunikujący się przez szynę NATS.

![Architektura ADYMUS](docs/assets/adymus-architektura.png)

### Założenia architektury

| Założenie | Rozwiązanie |
|---|---|
| Sterowanie głosem | Potok audio: redukcja szumu, wykrywanie słowa wywołującego, rozpoznawanie i synteza mowy. Docelowe opóźnienie poniżej 800 ms. |
| Hub-and-spoke | Menedżer rozdziela zadania. Agenci specjalistyczni (Sekretarka, Analityk, Księgowa, HR, Prawnik) tylko odpowiadają na zlecenia, co ogranicza pętle decyzyjne. |
| Human-in-the-loop | Zapis do bazy następuje wyłącznie po potwierdzeniu „TAK” przez użytkownika. Wykonuje go osobna bramka (HITL Gateway). |
| Multi-tenant | Dane firm są rozdzielone przez `tenant_id` i Row Level Security w PostgreSQL. |
| Router intencji | Proste, powtarzalne komendy są mapowane na funkcje bez wywołania LLM, co obniża koszt i opóźnienie. |
| Kanały | Głos, WhatsApp i SMS oraz analiza zdjęć (np. zdjęcie pustej półki zapisuje brak w magazynie). |
| Strażnik (Guardian) | Izolacja procesów i weryfikacja najważniejszych zmian przez człowieka. |
| Integracje | GUS BIR1, Google Workspace, KSeF, Stripe, wyszukiwarka prawa, scraper cen B2B. |

Więcej: [opis projektu](docs/adymus.md) oraz [strona projektu](https://sites.google.com/abmusiol.com/ai-factory/strona-g%C5%82%C3%B3wna/projekt-adymus).

<!-- pdf:page-break -->
## Doświadczenie zawodowe

| Okres | Stanowisko | Pracodawca |
|---|---|---|
| 2019–2024 | Pracownik produkcji olejów silnikowych i przekładniowych | Deutsche Ölwerke Lubmin GmbH, Lubmin (Niemcy) |
| 2013–2019 | Etatowy konserwator sprzętu straży pożarnej, gospodarz budynku ratusza, ogrodnik w miejskim zakładzie zieleni | Miasto Besigheim (Niemcy), sektor publiczny |
| 2011–2013 | Ślusarz | Metalbau Otterbach, Güglingen (Niemcy) |
| 2008–2011 | Monter przyczep kempingowych | Herzog Wohnwagen GmbH, Kirchheim am Neckar (Niemcy) |
| 2005–2008 | Pracownik produkcji, recyklingu i wywozu odpadów | WSP GmbH, Iska Buchen GmbH, Säff Stadtreinigung GmbH (Niemcy) |
| 1992–2004 | Strażak zawodowy, dowódca zastępu, technik pożarnictwa | Państwowa Straż Pożarna w Zabrzu |
| 1987–1992 | Mechanik samochodowy, ślusarz dołowy, zasadnicza służba wojskowa | WPK Gliwice, KWK Makoszowy, JW 2702 Żagań |

Ponad 12 lat w Państwowej Straży Pożarnej oznacza pracę według procedur, pod presją czasu i z odpowiedzialnością za ludzi i sprzęt.

## Wykształcenie i certyfikaty

| Okres | Kwalifikacja |
|---|---|
| 2026 | Pracuj w AI: Zostań Data Scientist od Zera, GoTo IT (gotoit.pl), certyfikat ukończenia szkolenia z 24.09.2026 |
| 1997–1998 | Szkoła Państwowej Straży Pożarnej, kształcenie podoficerskie, technik pożarnictwa |
| 1994–1997 | Pracownik biurowy, kształcenie zawodowe |
| 1989–1990 | Mechanik pojazdów samochodowych, świadectwo czeladnicze |

## Języki

- polski: ojczysty
- niemiecki: biegły, praca w Niemczech od 2005 roku
- angielski: podstawowy

## Współpraca

Model zadaniowy: ustalamy zakres, szacunek godzin i termin, potem realizuję zadanie z regularnym raportowaniem postępu. Kod trafia do repozytorium z historią commitów i opisem uruchomienia.

<!-- pdf:skip-start -->
## Licencja

Treść tego repozytorium jest udostępniona na licencji [MIT](LICENSE).
<!-- pdf:skip-end -->
