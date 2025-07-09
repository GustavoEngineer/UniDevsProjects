# ParImpar Node.js (Arquitectura Limpia)

## Requisitos
- Node.js
- npm
- OpenSSL (para generar certificados locales)

## Instalación

```bash
npm install
```

## Desarrollo

```bash
npm run dev
```

## Producción

```bash
npm start
```

## Endpoint

- **GET** `/even-odd?number=NUMERO`

Ejemplo:

```
https://localhost:3000/even-odd?number=4
```

Respuesta:
```json
{
  "number": 4,
  "result": "even"
}
```

## Notas
- El servidor corre en HTTPS usando certificados autofirmados (ver carpeta `src/config`).
- Si el navegador advierte sobre el certificado, acepta la excepción de seguridad para pruebas locales. 