# Datos del sitio (`/data`)

Estos archivos JSON alimentan las secciones **Promociones** y **Catálogo** de `index.html`. Se editan cada mes sin tocar HTML/CSS. El sitio los lee con `fetch()`, así que para probarlos localmente sirve el proyecto con un servidor HTTP (no abrir `index.html` directo con `file://`).

Flujo de trabajo: redactas el contenido en un archivo `.md` dentro de `/content` (las fichas de equipos pueden salir directo de la skill `/ficha-tecnica`) y luego se transcribe a estos JSON con el esquema de abajo.

## `promociones.json`

Objeto con dos bloques: `personas` y `pymes`.

```json
{
  "personas": {
    "notaGeneral": "Texto breve que aplica a todos los planes (ej. costos de activación).",
    "planes": [
      {
        "nombre": "Nombre del plan",
        "datos": "4 GB",
        "minutos": "200",
        "sms": "400",
        "recarga": "Bs. 3.300,00",
        "recomendado": true
      }
    ]
  },
  "pymes": {
    "notaGeneral": "Texto breve general para PYMES.",
    "planes": [
      {
        "nombre": "Nombre del plan/servicio",
        "slogan": "Frase comercial del plan (opcional)",
        "resumen": "Beneficio principal en una línea (opcional, para planes de precio único)",
        "precio": "Bs. 0.000,00 (opcional, para planes de precio único)",
        "variantes": [
          { "nombre": "Sub-plan", "datos": "1.5 GB", "sms": "200", "minutos": "100 min", "precio": "Bs. 0,00" }
        ],
        "terminos": ["Lista de condiciones adicionales / letra pequeña"]
      }
    ]
  }
}
```

Un plan PYME usa `resumen` + `precio` (precio único) **o** `variantes` (varias combinaciones), no ambos.

## `catalogo.json`

Objeto con `vigencia` (texto de validez de precios) y `marcas` (arreglo agrupado por fabricante).

```json
{
  "vigencia": "Precios vigentes desde el DD/MM/AAAA hasta el DD/MM/AAAA.",
  "marcas": [
    {
      "marca": "Nombre del fabricante",
      "equipos": [
        {
          "modelo": "Nombre comercial completo",
          "categoria": "telefono | accesorio",
          "specs": {
            "camara": "Trasera / Frontal",
            "bateria": "0000 mAh",
            "pantalla": "0.0\"",
            "huella": "Sí | No",
            "red": "4G | 5G"
          },
          "descripcion": "Solo para categoria=accesorio, reemplaza a specs",
          "variantes": [
            { "config": "128GB / 4GB", "precio": "$000" },
            { "config": "256GB / 8GB", "agotado": true }
          ]
        }
      ]
    }
  ]
}
```

Un equipo agotado en una configuración se marca con `"agotado": true` y sin `precio` en esa variante.

## FAQ

El contenido de preguntas frecuentes no es data-driven: vive directo en el HTML (`index.html`, sección `#faq`) porque no cambia con la misma frecuencia que promociones/catálogo. El borrador en `/content/faq.md` es solo la fuente para redactarlo.

Mientras no haya datos reales, `promociones.json` y `catalogo.json` pueden dejarse como `{}` y el sitio muestra un estado "Próximamente" en su lugar.
