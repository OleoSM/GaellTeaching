# LinguaQuest - Nueva Estructura Pedagógica

## 📋 Estructura Renovada

La aplicación ha sido completamente reestructurada con un enfoque pedagógico más claro y organizado.

---

## 🏗️ Arquitectura de Archivos

### **Página Principal (Dashboard)**
- `index.html` - Dashboard de progreso general del usuario
- `dashboard.js` - Lógica del dashboard (estadísticas, niveles desbloqueados)
- Funciones:
  - Ver progreso general (puntos, nivel, insignias)
  - Acceder a todos los niveles disponibles
  - Ver estadísticas detalladas
  - Sistema de logros/insignias

### **Páginas de Nivel Individual**
- `level.html` - Template para cada nivel (1-12)
- `level-view.js` - Lógica de navegación y flujo de aprendizaje
- `level-content.js` - Contenido educativo (introducción teórica) por nivel
- Flujo de aprendizaje:
  1. **Introducción** → Teoría y explicación gramatical
  2. **Vocabulario** → Lista visual de palabras clave
  3. **Flashcards** → Práctica con tarjetas
  4. **Juegos** → 6 actividades interactivas
  5. **Completar Nivel** → Modal de celebración

### **Recursos Compartidos**
- `curriculum.js` - Base de datos de 12 niveles con vocabulario
- `advanced-games.js` - 5 juegos educativos interactivos
- `styles.css` - Todos los estilos (dashboard + niveles)

### **Archivos Anteriores (respaldo)**
- `index-old.html` - Versión anterior de la página
- `script.js` - Lógica anterior (mantener por referencias)

---

## 🎯 Flujo de Usuario

### **1. Inicio en Dashboard (index.html)**
```
Usuario abre la aplicación
    ↓
Ve su progreso general
    ↓
Selecciona un nivel desbloqueado
    ↓
Redirige a level.html?id=X
```

### **2. Experiencia en Nivel Individual**
```
[PASO 1] Introducción Teórica
   📖 Lee sobre el tema del nivel
   📝 Puntos gramaticales
   🌍 Notas culturales
   💡 Consejos de aprendizaje
        ↓
   [Botón: Comenzar a Aprender]
        ↓

[PASO 2] Vocabulario Clave
   📚 Grid visual con 10 palabras
   - Palabra en inglés
   - Significado en español
   - Ejemplo de uso
        ↓
   [Botón: Practicar con Flashcards]
        ↓

[PASO 3] Práctica con Flashcards
   🎴 Tarjetas interactivas (flip)
   ✓ Marca si conoces la palabra
   ✗ Marca si no la conoces
   +10 puntos por palabra correcta
        ↓
   [Botón: Ir a Actividades Interactivas]
        ↓

[PASO 4] Juegos Educativos
   🎮 Selector con 6 juegos:
   
   1. 📝 Completa el Espacio
      - Completa oraciones con palabras
      - +20 puntos por respuesta correcta
      
   2. 🔤 Descifra la Palabra
      - Ordena letras desordenadas
      - +20 puntos por palabra
      
   3. ❓ Quiz de Opción Múltiple
      - 4 opciones, 1 correcta
      - +15 puntos por pregunta
      
   4. ⌨️ Practica Escritura
      - Escribe palabras rápidamente
      - +5 puntos por palabra
      - Mide WPM (palabras por minuto)
      
   5. 🏗️ Construye Oraciones
      - Arrastra palabras al orden correcto
      - +25 puntos por oración
      
   6. 🎯 Emparejar (Drag & Drop)
      - Une palabras con definiciones
      - +10 puntos por match
      - Límite de tiempo: 60 segundos
        ↓
   [Botón: Completar Nivel]
        ↓

[PASO 5] Nivel Completado
   🎉 Modal de celebración
   ⭐ +50 puntos bonus
   📊 Resumen de aprendizaje
   [Opciones:]
      - Volver al Dashboard
      - Ir al Siguiente Nivel
```

---

## 📊 Sistema de Progreso

### **Puntos y Niveles**
- 50 puntos = desbloquear 1 nivel nuevo
- Nivel 1: 0 puntos (desbloqueado por defecto)
- Nivel 2: 50 puntos
- Nivel 3: 100 puntos
- ...
- Nivel 12: 550 puntos

### **Progreso por Módulo**
Cada nivel tiene 4 secciones que deben completarse:
1. ✓ Leer introducción (automático)
2. ✓ Ver vocabulario (automático)
3. ✓ Practicar con flashcards (mínimo 5 tarjetas)
4. ✓ Jugar juegos (mínimo 2 juegos diferentes)

Barra de progreso muestra: 0%, 25%, 50%, 75%, 100%

### **Insignias/Logros**
- 🏆 Primeros Pasos (1 palabra aprendida)
- ⚡ Aprendiz Rápido (10 palabras)
- 🎨 Creador (5 tarjetas creadas)
- 💯 Perfeccionista (20 respuestas correctas)
- 🔥 En Racha (7 días seguidos)
- 🌟 Estrella Ascendente (50 puntos)

---

## 🎨 Contenido Educativo por Nivel

### **Niveles Básicos (1-6)**

**Nivel 1 - Hello World** 🌱
- Saludos y despedidas
- Verbo "to be" (am, is, are)
- Expresiones de cortesía
- Números 1-20

**Nivel 2 - My World** 🏠
- Familia y colores
- Pronombres posesivos (my, your, his)
- Objetos del salón
- Números 20-100

**Nivel 3 - Daily Life** 🌞
- Rutinas diarias
- Presente simple
- Días de la semana
- Verbos de acción

**Nivel 4 - Around Town** 🏙️
- Lugares de la ciudad
- Dar direcciones
- Transporte
- Preposiciones de lugar

**Nivel 5 - Food & Shopping** 🍽️
- Alimentos y bebidas
- Ordenar en restaurantes
- Some/Any
- Precios y compras

**Nivel 6 - Express Yourself** 😊
- Emociones y sentimientos
- Adjetivos descriptivos
- Uso de "because"
- Estados de ánimo

### **Niveles Intermedios (7-12)**

**Nivel 7 - Past Stories** 📖
- Pasado simple
- Verbos regulares e irregulares
- Expresiones de tiempo pasado
- Contar historias

**Nivel 8 - Future Plans** 🚀
- Futuro con "going to"
- Futuro con "will"
- Hacer planes y predicciones
- Promesas y ofrecimientos

**Nivel 9 - Comparisons** ⚖️
- Comparativos (-er, more)
- Superlativos (-est, most)
- As...as (igualdad)
- Adjetivos irregulares

**Nivel 10 - Experience** 🌍
- Presente perfecto (have/has)
- Participios pasados
- Ever, never, already, yet
- Experiencias de vida

**Nivel 11 - Conditions** 🔀
- Primer condicional (if + present, will)
- Segundo condicional (if + past, would)
- Condicional cero
- Hipótesis y posibilidades

**Nivel 12 - Fluency Bridge** 🌉
- Phrasal verbs comunes
- Separables vs inseparables
- Uso natural en conversación
- Los 20 más importantes

---

## 🎮 Juegos Disponibles

### **1. Fill in the Blanks (Completa el Espacio)**
- Oraciones con espacios en blanco
- Usa ejemplos del vocabulario del nivel
- Proporciona pistas (significado)
- 5 ejercicios por sesión

### **2. Word Scramble (Descifra)**
- Letras desordenadas para formar palabras
- Pista: significado de la palabra
- Botón de pista disponible
- 5 palabras por juego

### **3. Multiple Choice Quiz**
- 4 opciones de respuesta
- 1 correcta + 3 distractores
- Feedback visual inmediato
- 5 preguntas por quiz

### **4. Typing Practice (Práctica de Escritura)**
- Escribe la traducción de palabras
- Feedback en tiempo real
- Calcula palabras por minuto (WPM)
- Mejora velocidad y precisión

### **5. Sentence Builder (Constructor)**
- Palabras desordenadas
- Arrastra al orden correcto
- Usa oraciones reales del vocabulario
- Mobile-friendly (click o drag)

### **6. Drag & Match (Emparejar)**
- Arrastra palabras a definiciones
- Timer de 60 segundos
- 5 pares por juego
- Feedback visual (correcto/incorrecto)

---

## 🔧 Cómo Usar la Aplicación

### **Primera Vez**
1. Abre `index.html` en tu navegador
2. Verás el Dashboard con Nivel 1 desbloqueado
3. Click en "Basic 1 - Hello World"
4. Sigue el flujo del nivel paso a paso
5. Completa el nivel y gana 50 puntos
6. Vuelve al Dashboard → Nivel 2 se desbloquea automáticamente

### **Navegación**
- **Dashboard (index.html)**: Ver progreso general y seleccionar niveles
- **Nivel Individual (level.html)**: Aprender contenido del módulo
- **Botón "Volver"**: En cada nivel para regresar al dashboard
- **Header "Dashboard"**: Link siempre disponible en el header

### **Progreso**
- El progreso se guarda automáticamente en `localStorage`
- Cada nivel recuerda tu progreso individual
- Puedes cerrar y abrir el navegador sin perder datos
- Para reiniciar: `localStorage.clear()` en la consola del navegador

---

## 📱 Características Técnicas

### **Responsive Design**
- ✓ Desktop (1920px+)
- ✓ Tablet (768px-1024px)
- ✓ Mobile (320px-768px)

### **Compatibilidad**
- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

### **Tecnologías**
- HTML5 (semántico)
- CSS3 (variables, grid, flexbox)
- JavaScript ES6+ (modular)
- LocalStorage (persistencia)
- Sin dependencias externas

### **Rendimiento**
- Sin librerías externas (vanilla JS)
- CSS optimizado con variables
- Carga rápida (< 1 segundo)
- Imágenes no requeridas (solo emojis)

---

## 🎓 Metodología Pedagógica

### **Inspirado en CENLEX IPN**
La estructura sigue principios del Centro de Lenguas Extranjeras:
- Progresión gradual de básico a intermedio
- 120 palabras base distribuidas en 12 niveles
- Enfoque comunicativo
- Práctica constante y variada

### **Principios de Diseño Instruccional**
1. **Introducción** → Construir contexto (¿Por qué aprendo esto?)
2. **Vocabulario** → Presentación explícita (¿Qué debo saber?)
3. **Práctica Guiada** → Flashcards con feedback (¿Lo estoy haciendo bien?)
4. **Práctica Libre** → Juegos variados (¿Puedo aplicarlo?)
5. **Evaluación** → Completar nivel (¿Domino el tema?)

### **Gamificación**
- Puntos por cada acción
- Insignias de logro
- Barra de progreso visual
- Celebración al completar niveles
- Sin presión de tiempo (excepto en juegos opcionales)

---

## 📝 Archivos y Responsabilidades

```
fh2/
├── index.html              → Dashboard principal (ver progreso)
├── dashboard.js            → Lógica del dashboard
├── level.html              → Template de nivel individual
├── level-view.js           → Lógica de flujo de nivel
├── level-content.js        → Contenido educativo (teoría)
├── curriculum.js           → Base de datos (12 niveles + vocabulario)
├── advanced-games.js       → 5 juegos interactivos
├── styles.css              → Todos los estilos (2000+ líneas)
│
├── index-old.html          → Respaldo de versión anterior
├── script.js               → Lógica anterior (referencia)
│
└── [otros]
    ├── bienvenida.html     → Página de bienvenida
    ├── guia-visual.html    → Guía visual del curriculum
    ├── README.md           → Este archivo
    ├── PLAN_DE_ESTUDIOS.md → Documentación del curriculum
    └── RESUMEN_EJECUTIVO.md→ Resumen ejecutivo del proyecto
```

---

## 🚀 Próximos Pasos Recomendados

### **Funcionalidades Futuras**
1. **Sistema de Repaso Espaciado**
   - Algoritmo para revisar palabras olvidadas
   - Notificaciones de repaso

2. **Pronunciación con Web Speech API**
   - Escuchar pronunciación nativa
   - Evaluar pronunciación del usuario

3. **Diálogos Interactivos**
   - Conversaciones ramificadas
   - Práctica de situaciones reales

4. **Certificados**
   - Generar PDF al completar los 12 niveles
   - Compartir en redes sociales

5. **Modo Oscuro**
   - Toggle para tema oscuro
   - Preferencia guardada

6. **Estadísticas Avanzadas**
   - Gráficas de progreso semanal
   - Tiempo de estudio
   - Palabras más difíciles

### **Optimizaciones**
1. Service Worker (PWA)
2. Animaciones más suaves
3. Sonidos de feedback
4. Más contenido por nivel (lecturas, audios)

---

## ✨ Diferencias con Versión Anterior

### **ANTES (index-old.html)**
- Todo en una sola página
- Flashcards y juegos mezclados
- Sin estructura clara de aprendizaje
- No había contenido teórico
- Navegación confusa

### **AHORA (nueva estructura)**
- Dashboard separado de niveles
- Flujo pedagógico claro (teoría → práctica → juegos)
- Cada nivel tiene su propia página
- Contenido educativo detallado por nivel
- Progreso visual y claro
- Navegación intuitiva

---

## 📞 Soporte

Para preguntas o problemas:
1. Revisa este README
2. Consulta `PLAN_DE_ESTUDIOS.md` para detalles del curriculum
3. Abre la consola del navegador (F12) para ver errores

---

**Versión**: 2.0  
**Última actualización**: Febrero 2024  
**Autor**: LinguaQuest Team

¡Feliz aprendizaje! 🎓🚀
