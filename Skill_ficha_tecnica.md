---
name: ficha-tecnica-celular
description: "Genera fichas técnicas de equipos celulares en formato Markdown con tabla comparativa y estilo de marca. Se activa con el comando /ficha-tecnica. Extrae, normaliza y estructura especificaciones técnicas (modelo, procesador, cámara, batería, precio) incluso desde fuentes desordenadas o incompletas."
license: MIT
metadata:
  version: '1.0'
  author: 'Yudith Zaghlul'
  language: 'es'
---

# Ficha Técnica de Equipos Celulares

## Cuándo usar esta skill

Usa esta skill cuando el usuario:

- Escriba el comando `/ficha-tecnica` seguido del nombre de uno o varios modelos de celular.
- Pida "generar una ficha técnica", "comparar celulares", "extraer especificaciones" o "crear tabla comparativa de equipos".
- Proporcione texto desordenado, notas sueltas, capturas transcritas o datos parciales de un dispositivo móvil y necesite que se estructuren en una ficha técnica profesional.

## Comando de activación

El comando principal es:

```
/ficha-tecnica [modelo o lista de modelos]
```

**Ejemplos de invocación:**

| Comando | Acción esperada |
|---|---|
| `/ficha-tecnica Samsung Galaxy S24 Ultra` | Genera una sola ficha técnica |
| `/ficha-tecnica iPhone 15 Pro, Pixel 8 Pro, Galaxy S24 Ultra` | Genera tabla comparativa de 3 equipos |
| `/ficha-tecnica` + texto pegado con specs sueltas | Extrae y normaliza los datos del texto |

Cuando el usuario escriba `/ficha-tecnica` sin un modelo, pregunta qué equipo o equipos desea fichar.

---

## 1. Estructura de datos requerida

Cada ficha técnica debe contener obligatoriamente los siguientes campos. Si un dato no está disponible, marcarlo como `No disponible` y, de ser posible, completarlo con una búsqueda web rápida.

### Campos obligatorios

| Campo | Clave interna | Descripción | Ejemplo |
|---|---|---|---|
| Modelo | `modelo` | Nombre comercial completo del equipo | Samsung Galaxy S24 Ultra |
| Procesador | `procesador` | Chipset, núcleos y velocidad de reloj | Snapdragon 8 Gen 3, 8 núcleos, 3.39 GHz |
| Cámara | `camara` | Configuración de cámaras traseras y frontales (MP, apertura, lentes) | Trasera: 200 MP f/1.7 + 50 MP + 12 MP; Frontal: 12 MP f/2.2 |
| Batería | `bateria` | Capacidad en mAh y carga rápida (W) | 5000 mAh, carga rápida 45 W |
| Precio | `precio` | Precio de referencia en USD (o moneda especificada) | USD 1,299 |

### Campos opcionales (recomendados)

| Campo | Clave interna | Descripción |
|---|---|---|
| Pantalla | `pantalla` | Tamaño, resolución, tecnología (AMOLED, LCD, etc.) y tasa de refresco |
| Memoria RAM | `ram` | Capacidad en GB |
| Almacenamiento | `almacenamiento` | Capacidad interna y opción de microSD |
| Sistema operativo | `os` | Versión de fábrica |
| Conectividad | `conectividad` | 5G, NFC, Bluetooth, Wi-Fi |
| Dimensiones | `dimensiones` | Alto x ancho x grosor y peso |
| Fecha de lanzamiento | `lanzamiento` | Mes y año |

### Reglas de extracción de datos

1. **Normalización de unidades**: Todas las baterías en mAh, todas las memorias en GB, todos los precios en USD (a menos que el usuario indique otra moneda).
2. **Procesador completo**: Incluir fabricante (Qualcomm, MediaTek, Apple, Google), nombre del chipset, número de núcleos y velocidad máxima de reloj. Si solo se menciona "Snapdragon 8 Gen 3", completar los datos faltantes con una búsqueda.
3. **Cámara detallada**: Separar cada sensor con su resolución en MP y apertura f/. Indicar si es gran angular, teleobjetivo, ultrawide, etc. Si la fuente solo dice "cámara triple 200 MP", inferir que el sensor principal es 200 MP y marcar los secundarios como `No disponible` si no se pueden confirmar.
4. **Precio consistente**: Usar el precio oficial de lanzamiento en USD. Si solo se encuentra en otra moneda, convertir con la tasa actual e indicar `(aprox.)`.
5. **Marcar incertidumbre**: Si un dato se infiere o se completa desde una fuente externa, añadir un `*` y una nota al pie indicando la fuente.

---

## 2. Reglas de formato de salida

### Formato general

- Todo el resultado en **Markdown**.
- Idioma: **Español** (o el idioma en que el usuario se comunique).
- Una sola ficha técnica se presenta como una **tabla de especificaciones de dos columnas** (Campo | Valor).
- Dos o más equipos se presentan en una **tabla comparativa** donde cada columna es un equipo y cada fila es un campo de especificación.
- Al final de la ficha o tabla, incluir una sección **"Fuentes"** con los enlaces consultados en formato Markdown.

### Plantilla de ficha individual

```markdown
# Ficha Técnica: [MODELO]

| Campo | Especificación |
|---|---|
| **Modelo** | [valor] |
| **Procesador** | [valor] |
| **Pantalla** | [valor] |
| **Cámara trasera** | [valor] |
| **Cámara frontal** | [valor] |
| **Batería** | [valor] |
| **Memoria RAM** | [valor] |
| **Almacenamiento** | [valor] |
| **Sistema operativo** | [valor] |
| **Conectividad** | [valor] |
| **Dimensiones** | [valor] |
| **Fecha de lanzamiento** | [valor] |
| **Precio** | [valor] |

---

### Fuentes
- [Fuente 1](url)
- [Fuente 2](url)
```

### Plantilla de tabla comparativa

```markdown
# Comparativa de Equipos Celulares

| Especificación | [Equipo 1] | [Equipo 2] | [Equipo 3] |
|---|---|---|---|
| **Modelo** | [valor] | [valor] | [valor] |
| **Procesador** | [valor] | [valor] | [valor] |
| **Pantalla** | [valor] | [valor] | [valor] |
| **Cámara trasera** | [valor] | [valor] | [valor] |
| **Cámara frontal** | [valor] | [valor] | [valor] |
| **Batería** | [valor] | [valor] | [valor] |
| **Memoria RAM** | [valor] | [valor] | [valor] |
| **Almacenamiento** | [valor] | [valor] | [valor] |
| **Sistema operativo** | [valor] | [valor] | [valor] |
| **Conectividad** | [valor] | [valor] | [valor] |
| **Dimensiones** | [valor] | [valor] | [valor] |
| **Fecha de lanzamiento** | [valor] | [valor] | [valor] |
| **Precio** | [valor] | [valor] | [valor] |

---

### Fuentes
- [Fuente 1](url)
```

### Estilo de marca

- **Encabezados**: Usar `#` para el título principal (`Ficha Técnica: MODELO` o `Comparativa de Equipos Celulares`).
- **Negritas**: Los nombres de campos van en negrita dentro de la tabla.
- **Separadores**: Incluir una línea horizontal `---` antes de la sección de fuentes.
- **Notas al pie**: Usar `*` seguido de la aclaración al final de la tabla, antes de las fuentes.
- **Emojis**: No usar emojis a menos que el usuario lo solicite.
- **Orden de campos**: Mantener el orden definido en las plantillas de arriba hacia abajo.

---

## 3. Instrucción de comando

Claude debe reconocer el siguiente patrón de comando al inicio del mensaje del usuario:

```
/ficha-tecnica
```

**Comportamiento según argumentos:**

| Entrada del usuario | Acción |
|---|---|
| `/ficha-tecnica` solo | Preguntar: "¿Qué equipo o equipos deseas incluir en la ficha técnica?" |
| `/ficha-tecnica [Modelo]` | Buscar especificaciones del modelo y generar ficha individual |
| `/ficha-tecnica [Modelo 1, Modelo 2, ...]` | Buscar especificaciones de cada modelo y generar tabla comparativa |
| `/ficha-tecnica` seguido de texto pegado | Extraer datos del texto, normalizar y completar con búsqueda web si faltan campos obligatorios |

**Sinónimos aceptados** (activan la misma tarea aunque el usuario no use el comando exacto):

- "genera una ficha técnica"
- "crea una ficha técnica"
- "compara estos celulares"
- "extrae las especificaciones"
- "hazme un cuadro comparativo de teléfonos"

---

## 4. Ejemplo de extracción desde fuente desordenada

### Entrada del usuario (texto desordenado)

```
/ficha-tecnica

esto lo saque de una pagina:
el telefono es galaxy s24 ultra de samsung, tiene una pantalla grande
6.8 pulgadas algo de amoled y 120hz creo, el chip es snapdragon 8 gen 3
bateria 5000 creo que mAh, carga de 45w
camaras: atras tiene 200mp + 50mp + 12mp, la de adelante 12mp
ram 12GB, guardado 256gb 512gb 1tb
precio como 1299 dolares
trae android 14, 5g, nfc si, bluetooth 5.3
```

### Salida esperada

```markdown
# Ficha Técnica: Samsung Galaxy S24 Ultra

| Campo | Especificación |
|---|---|
| **Modelo** | Samsung Galaxy S24 Ultra |
| **Procesador** | Qualcomm Snapdragon 8 Gen 3, 8 núcleos, 3.39 GHz * |
| **Pantalla** | 6.8" Dynamic AMOLED 2X, 3120 x 1440 px, 120 Hz |
| **Cámara trasera** | 200 MP f/1.7 (principal) + 50 MP (teleobjetivo) + 12 MP (ultrawide) * |
| **Cámara frontal** | 12 MP f/2.2 * |
| **Batería** | 5000 mAh, carga rápida 45 W |
| **Memoria RAM** | 12 GB |
| **Almacenamiento** | 256 GB / 512 GB / 1 TB |
| **Sistema operativo** | Android 14 (One UI 6.1) * |
| **Conectividad** | 5G, NFC, Bluetooth 5.3, Wi-Fi 7 * |
| **Dimensiones** | No disponible |
| **Fecha de lanzamiento** | Enero 2024 * |
| **Precio** | USD 1,299 |

---

### Notas
- \* Datos completados o verificados mediante búsqueda web.

### Fuentes
- [Samsung Galaxy S24 Ultra - Especificaciones oficiales](https://www.samsung.com/global/galaxy/galaxy-s24-ultra/)
- [GSMArena - Samsung Galaxy S24 Ultra](https://www.gsmarena.com/samsung_galaxy_s24_ultra-12771.php)
```

### Lo que hizo Claude en este ejemplo

| Acción | Detalle |
|---|---|
| Identificó el modelo | "galaxy s24 ultra de samsung" → Samsung Galaxy S24 Ultra |
| Normalizó el procesador | "snapdragon 8 gen 3" → Qualcomm Snapdragon 8 Gen 3, completó núcleos y velocidad con búsqueda |
| Estructuró las cámaras | Separó los sensores traseros por MP y asignó roles (principal, teleobjetivo, ultrawide) |
| Completó datos faltantes | Versión de One UI, Wi-Fi 7 y fecha de lanzamiento se obtuvieron por búsqueda y se marcaron con `*` |
| Detectó opción de marca | El usuario no dio dimensiones; se marcó como `No disponible` en lugar de inventar |
| Conservó datos del usuario | Los datos que el usuario proporcionó correctamente se usaron tal cual, sin sobrescribir |

---

## Flujo de trabajo recomendado

1. **Detectar el comando** `/ficha-tecnica` o un sinónimo en el mensaje del usuario.
2. **Identificar el modelo o modelos**: Extraer nombres de la línea de comando o del texto pegado.
3. **Recopilar datos**: Si el usuario pegó texto, extraer todos los valores identificables. Si faltan campos obligatorios, realizar una búsqueda web.
4. **Normalizar**: Convertir todos los valores al formato estándar (mAh, GB, USD, MP con apertura f/).
5. **Completar**: Rellenar campos opcionales si están disponibles en las fuentes consultadas.
6. **Marcar incertidumbre**: Añadir `*` a datos inferidos o completados externamente, con nota al pie.
7. **Generar salida**: Aplicar la plantilla correspondiente (ficha individual o tabla comparativa).
8. **Citar fuentes**: Incluir enlaces reales a las páginas consultadas.
