## Tehnoloogiad

- Frontend: React + Vite
- Backend: ASP.NET Core Web API
- Database: SQLite

## Taotluse valjad
Iga puhkusetaotlus sisaldab:

- `Id`
- `UserId`
- `StartDate`
- `EndDate`
- `Comment`

## How to run

### 1. Run backend

Open terminal in:

```powershell
...\backend
```

Run:

```powershell
dotnet run --launch-profile https
```

Expected backend URL:

```text
https://localhost:7154
```

Swagger:

```text
https://localhost:7154/swagger
```

### 2. Run frontend

Open another terminal in:

```powershell
...\frontend
```

Run:

```powershell
npm run start
```

Expected frontend URL:

```text
https://localhost:8080
```

If the browser shows a local certificate warning, continue anyway. This is expected for local HTTPS development.

## Backend route'id

- `GET /api/vacationrequests`
- `POST /api/vacationrequests`
- `GET /api/vacationrequests/{id}`
- `POST /api/vacationrequests/{id}/edit`
- `POST /api/vacationrequests/{id}/delete`


## Kuidas ma teeksin automaattestid

Kui ma lisaksin automaatteste, siis alustaksin backend route'ide testimisest, et kontrollida lisamist, nimekirja vaatamist, uhe kirje kusimist, muutmist ja kustutamist, sest see on rakenduse pohiline loogika. Seejarel lisaksin moned frontend testid vormi kaitumise, paevade arvu arvutamise ja tabelis andmete kuvamise jaoks. Parast seda teeksin uhe voi kaks lihtsat end-to-end testi, kus kasutaja avab lehe, lisab taotluse, muudab seda ja kustutab selle. Peamine eesmark oleks kontrollida, et koige olulisem kasutajavoog tootab korrektselt ning frontend ja backend tootavad koos ilma, et midagi katki laheks.

## Kuidas ma lahendaksin samaaegse muutmise

Kui sama puhkusetaotlust muudetakse samal ajal kahes seadmes:

Pohiidee:

1. Lisa puhkusetaotluse kirjele vali, naiteks `IsEditing`
2. Kui uks kasutaja alustab taotluse muutmist, seab backend `IsEditing = true`
3. Kui `IsEditing = true`, siis teistel kasutajatel ei ole lubatud sama taotlust muuta
4. Kui esimene kasutaja salvestab muudatused voi katkestab muutmise, seab backend `IsEditing = false`
5. Frontend naitab teadet, et keegi teine muudab seda taotlust praegu

See on lihtne ja kergesti arusaadav lahenemine.  
Selle lahenduse probleem on see, et kui kasutaja sulgeb brauseri voi uhendus katkeb, voib kirje jaada lukustatud olekusse.  
