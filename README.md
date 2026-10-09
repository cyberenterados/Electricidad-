# Electricidad-

## Análisis del proyecto

Electricidad- es una página web estática de presentación y contacto para un servicio de electricidad a domicilio. La experiencia está dirigida a visitantes de Argentina (contenido en español rioplatense) y busca facilitar la consulta de trabajos eléctricos por WhatsApp.

### Funcionalidad

- Presenta servicios de diagnóstico y reparación, instalaciones eléctricas y mantenimiento preventivo.
- Explica el proceso de atención e incluye preguntas frecuentes y llamadas a la acción.
- Ofrece navegación adaptable a dispositivos móviles y un diálogo de contacto con mensajes sugeridos según el servicio elegido.
- Genera un enlace de WhatsApp con el mensaje codificado y valida el número antes de habilitar el contacto.
- Actualiza automáticamente el año del pie de página.

### Estructura y tecnologías

- `index.html`: contenido, estructura semántica, metadatos, preguntas frecuentes y diálogo de contacto. Las fotografías están incrustadas en el HTML como datos Base64.
- `styles.css`: identidad visual y diseño adaptable, sin dependencias externas.
- `script.js`: menú móvil, diálogo accesible, preparación de mensajes y enlace de WhatsApp.

El sitio no requiere un servidor de aplicaciones, base de datos, proceso de compilación ni paquetes externos. No se encontraron pruebas automatizadas ni una configuración de lint en el proyecto.

### Configuración necesaria

Antes de publicar el sitio para recibir consultas, configura `WHATSAPP_NUMBER` en `script.js` con el teléfono real en formato internacional: solo dígitos, sin `+`, espacios ni guiones. Para un móvil de Argentina, el formato indicado en el código es `549` + código de área + número, sin `0` ni `15`. Si permanece vacío, el sitio informa que el contacto por WhatsApp todavía no está disponible.

### Ejecución y publicación

Para revisar el sitio localmente, abre `index.html` en un navegador. También puede servirse con cualquier servidor de archivos estáticos. Para publicarlo, despliega los tres archivos del proyecto en un hosting estático y verifica el enlace de WhatsApp tanto en escritorio como en móvil.

### Evaluación y próximos pasos

La solución es liviana en dependencias, tiene una separación clara entre contenido, estilos y comportamiento, y contempla navegación móvil y controles de teclado. Como siguiente paso prioritario, configura y prueba el número de contacto real antes del despliegue. Después conviene comprobar los enlaces y la presentación en varios tamaños de pantalla, validar accesibilidad y metadatos, y considerar extraer las imágenes Base64 a archivos optimizados para facilitar su mantenimiento y mejorar la caché. Al no haber pruebas automatizadas, los cambios deben validarse manualmente en navegador.
