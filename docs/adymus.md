# ADYMUS: opis projektu

## Cel

System AI dla mikro i małych firm (JDG), sterowany głosem. Wspiera właściciela w codziennych zadaniach: obsługa klienta i kalendarza, analiza kosztów, księgowość, sprawy kadrowe i prawne. Wymagania niefunkcjonalne: krótki czas odpowiedzi, izolacja danych między firmami i kontrola człowieka nad zapisem danych.

## Komponenty

| Komponent | Rola |
|---|---|
| `frontend` | Dashboard wizualny (Next.js) |
| `api-gateway` | Bramka API i WebSocket dla audio (FastAPI) |
| `voice-engine` | Wake-word (Porcupine), STT (Faster Whisper), TTS (Piper) |
| `hitl-gateway` | Wykonuje zapisy w bazie tylko po zatwierdzeniu przez użytkownika |
| `shared` | Wspólne modele danych |
| `agents/manager_adymus` | Orkiestracja i stan zadań |
| `agents/secretary` | CRM, kalendarz, komunikacja |
| `agents/analyst` | Magazyn, ceny B2B |
| `agents/accountant` | Faktury, KSeF, Stripe |
| `agents/hr` | Pracownicy, urlopy, szkolenia BHP |
| `agents/lawyer` | Zmiany w prawie, wyszukiwanie w sieci |

## Dane

- PostgreSQL: dane relacyjne, izolacja `tenant_id` z RLS
- Qdrant: pamięć wektorowa (dokumenty, procedury)
- Redis: sesje i krótkie kolejki

## Decyzje projektowe

1. **Router intencji zamiast LLM** dla zadań deterministycznych. Mniejszy koszt i opóźnienie.
2. **Agenci tylko odpowiadają na zlecenia.** Zlecenia kieruje Menedżer przez NATS, agenci nie wywołują się wzajemnie.
3. **Zapis tylko przez HITL Gateway.** Operacja trafia do tabeli `pending_actions` i jest wykonywana po potwierdzeniu głosowym „TAK”.
4. **Izolacja najemców na poziomie bazy**, nie tylko aplikacji.
5. **Przetwarzanie audio offline**, bez wysyłania głosu do usług zewnętrznych.

<!-- pdf:skip-start -->
## Diagram

![Architektura ADYMUS](assets/adymus-architektura.png)
<!-- pdf:skip-end -->
