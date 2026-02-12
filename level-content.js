/* ========================================
   LEVEL EDUCATIONAL CONTENT
   Learning Material for Each Level
   ======================================== */

const LEVEL_CONTENT = {
    1: {
        introduction: `
            <h4>¡Bienvenido a tu primer nivel de inglés!</h4>
            <p>En este módulo aprenderás los fundamentos básicos del inglés: cómo saludar, despedirse y presentarte.</p>
            
            <div class="learning-objectives">
                <h5>🎯 Objetivos de Aprendizaje:</h5>
                <ul>
                    <li>Saludar y despedirse en diferentes contextos</li>
                    <li>Presentarte diciendo tu nombre</li>
                    <li>Usar expresiones de cortesía básicas</li>
                    <li>Entender y responder preguntas simples</li>
                </ul>
            </div>

            <div class="grammar-point">
                <h5>📝 Punto Gramatical:</h5>
                <p><strong>El verbo "to be" (ser/estar)</strong></p>
                <ul>
                    <li>I am → I'm (Yo soy/estoy)</li>
                    <li>You are → You're (Tú eres/estás)</li>
                    <li>He/She is (Él/Ella es/está)</li>
                </ul>
                <p class="example">Ejemplo: "My name is Maria" = "Mi nombre es María"</p>
            </div>

            <div class="cultural-note">
                <h5>🌍 Nota Cultural:</h5>
                <p>En países de habla inglesa, es común usar "Hello" o "Hi" en contextos informales, 
                mientras que "Good morning/afternoon/evening" son más formales.</p>
            </div>
        `,
        tips: [
            'Practica los saludos en voz alta',
            'Intenta usar estas frases en tu vida diaria',
            'Recuerda que "Please" y "Thank you" son muy importantes en inglés'
        ]
    },

    2: {
        introduction: `
            <h4>Hablando sobre tu mundo personal</h4>
            <p>En este nivel aprenderás a hablar sobre tu familia, describir colores y objetos del salón de clases.</p>
            
            <div class="learning-objectives">
                <h5>🎯 Objetivos de Aprendizaje:</h5>
                <ul>
                    <li>Nombrar miembros de la familia en inglés</li>
                    <li>Identificar y usar colores básicos</li>
                    <li>Describir objetos comunes del salón</li>
                    <li>Usar números del 20 al 100</li>
                </ul>
            </div>

            <div class="grammar-point">
                <h5>📝 Punto Gramatical:</h5>
                <p><strong>Pronombres posesivos</strong></p>
                <ul>
                    <li>My (mi/mis) → My mother</li>
                    <li>Your (tu/tus) → Your book</li>
                    <li>His/Her (su/sus) → His father</li>
                </ul>
                <p class="example">Ejemplo: "My brother is 10 years old" = "Mi hermano tiene 10 años"</p>
            </div>

            <div class="pronunciation-tip">
                <h5>🗣️ Consejo de Pronunciación:</h5>
                <p>La "th" en "mother" y "father" se pronuncia colocando la lengua entre los dientes.</p>
            </div>
        `,
        tips: [
            'Crea un árbol genealógico en inglés',
            'Etiqueta objetos de tu casa con sus nombres en inglés',
            'Practica describiendo objetos: "The book is red"'
        ]
    },

    3: {
        introduction: `
            <h4>Tu rutina diaria en inglés</h4>
            <p>Aprenderás a describir tus actividades cotidianas, hablar sobre el tiempo y usar el presente simple.</p>
            
            <div class="learning-objectives">
                <h5>🎯 Objetivos de Aprendizaje:</h5>
                <ul>
                    <li>Describir tu rutina diaria</li>
                    <li>Usar verbos de acción comunes</li>
                    <li>Hablar sobre días de la semana</li>
                    <li>Expresar frecuencia (always, sometimes, never)</li>
                </ul>
            </div>

            <div class="grammar-point">
                <h5>📝 Punto Gramatical:</h5>
                <p><strong>Presente Simple (Simple Present)</strong></p>
                <ul>
                    <li>I/You/We/They + verbo → I wake up at 7 AM</li>
                    <li>He/She/It + verbo + s → She wakes up at 7 AM</li>
                    <li>Negativo: I don't wake up early</li>
                </ul>
                <p class="example">Ejemplo: "I study English every day" = "Estudio inglés todos los días"</p>
            </div>

            <div class="practice-exercise">
                <h5>✏️ Ejercicio Mental:</h5>
                <p>Piensa en 3 cosas que haces todos los días y fórmalas en inglés usando el presente simple.</p>
            </div>
        `,
        tips: [
            'Escribe tu rutina diaria en inglés',
            'Usa adverbios de frecuencia: always, usually, sometimes, never',
            'Recuerda agregar "s" a los verbos con he/she/it'
        ]
    },

    4: {
        introduction: `
            <h4>Moviéndote por la ciudad</h4>
            <p>En este nivel aprenderás a dar y pedir direcciones, hablar sobre lugares en la ciudad y medios de transporte.</p>
            
            <div class="learning-objectives">
                <h5>🎯 Objetivos de Aprendizaje:</h5>
                <ul>
                    <li>Nombrar lugares comunes de la ciudad</li>
                    <li>Dar direcciones simples</li>
                    <li>Hablar sobre transporte</li>
                    <li>Usar preposiciones de lugar (in, on, at, near)</li>
                </ul>
            </div>

            <div class="grammar-point">
                <h5>📝 Punto Gramatical:</h5>
                <p><strong>Preposiciones de Lugar</strong></p>
                <ul>
                    <li>in → dentro de (in the park)</li>
                    <li>on → sobre (on the street)</li>
                    <li>at → en (at school)</li>
                    <li>near → cerca de (near the hospital)</li>
                </ul>
                <p class="example">Ejemplo: "The school is near the park" = "La escuela está cerca del parque"</p>
            </div>

            <div class="useful-phrases">
                <h5>💬 Frases Útiles:</h5>
                <ul>
                    <li>"Where is...?" = ¿Dónde está...?</li>
                    <li>"Turn left/right" = Gira a la izquierda/derecha</li>
                    <li>"Go straight" = Sigue derecho</li>
                </ul>
            </div>
        `,
        tips: [
            'Practica dando direcciones a lugares que conoces',
            'Dibuja un mapa y etiquétalo en inglés',
            'Aprende las preposiciones con gestos físicos'
        ]
    },

    5: {
        introduction: `
            <h4>Comida y compras</h4>
            <p>Aprenderás vocabulario sobre alimentos, cómo ordenar en un restaurante y hacer compras básicas.</p>
            
            <div class="learning-objectives">
                <h5>🎯 Objetivos de Aprendizaje:</h5>
                <ul>
                    <li>Nombrar alimentos y bebidas comunes</li>
                    <li>Ordenar comida en un restaurante</li>
                    <li>Preguntar precios</li>
                    <li>Usar "some" y "any" para cantidades</li>
                </ul>
            </div>

            <div class="grammar-point">
                <h5>📝 Punto Gramatical:</h5>
                <p><strong>Countable vs Uncountable Nouns</strong></p>
                <ul>
                    <li>Contables: one apple, two apples (con números)</li>
                    <li>Incontables: some water, some rice (sin números)</li>
                    <li>Some → oraciones positivas (I have some milk)</li>
                    <li>Any → preguntas y negativas (Do you have any sugar?)</li>
                </ul>
            </div>

            <div class="dialogue-example">
                <h5>🎭 Diálogo Ejemplo:</h5>
                <p><strong>Cliente:</strong> "I would like some coffee, please."</p>
                <p><strong>Mesero:</strong> "Would you like sugar with that?"</p>
                <p><strong>Cliente:</strong> "No, thank you. How much is it?"</p>
            </div>
        `,
        tips: [
            'Practica ordenando en inglés (aunque sea en tu mente)',
            'Aprende a preguntar "How much is this?"',
            'Memoriza nombres de tus comidas favoritas'
        ]
    },

    6: {
        introduction: `
            <h4>Expresando emociones</h4>
            <p>En este nivel aprenderás a hablar sobre sentimientos, estados de ánimo y describir cómo te sientes.</p>
            
            <div class="learning-objectives">
                <h5>🎯 Objetivos de Aprendizaje:</h5>
                <ul>
                    <li>Identificar y expresar emociones</li>
                    <li>Preguntar cómo se siente alguien</li>
                    <li>Dar razones usando "because"</li>
                    <li>Usar adjetivos de sentimiento</li>
                </ul>
            </div>

            <div class="grammar-point">
                <h5>📝 Punto Gramatical:</h5>
                <p><strong>Adjetivos de Sentimiento</strong></p>
                <ul>
                    <li>I am happy (Estoy feliz)</li>
                    <li>She feels sad (Ella se siente triste)</li>
                    <li>They are excited (Ellos están emocionados)</li>
                    <li>Because → porque (I'm happy because it's sunny)</li>
                </ul>
            </div>

            <div class="expression-practice">
                <h5>😊 Practica Expresiones:</h5>
                <ul>
                    <li>"How are you feeling?" = ¿Cómo te sientes?</li>
                    <li>"I feel..." = Me siento...</li>
                    <li>"That makes me..." = Eso me hace...</li>
                </ul>
            </div>
        `,
        tips: [
            'Mantén un diario de emociones en inglés',
            'Describe cómo te sientes cada día',
            'Aprende a usar "because" para dar razones'
        ]
    },

    7: {
        introduction: `
            <h4>¡Bienvenido al nivel intermedio! Hablando del pasado</h4>
            <p>Es hora de contar historias. Aprenderás a hablar sobre eventos que ya sucedieron usando el pasado simple.</p>
            
            <div class="learning-objectives">
                <h5>🎯 Objetivos de Aprendizaje:</h5>
                <ul>
                    <li>Usar el pasado simple (Simple Past)</li>
                    <li>Distinguir verbos regulares e irregulares</li>
                    <li>Contar historias sobre el pasado</li>
                    <li>Usar expresiones de tiempo pasado (yesterday, last week)</li>
                </ul>
            </div>

            <div class="grammar-point">
                <h5>📝 Punto Gramatical:</h5>
                <p><strong>Pasado Simple (Simple Past)</strong></p>
                <ul>
                    <li>Regulares: verb + ed → I walked, She played</li>
                    <li>Irregulares: formas especiales → I went, She ate</li>
                    <li>Negativo: didn't + verbo base → I didn't go</li>
                    <li>Pregunta: Did + you + verbo? → Did you see it?</li>
                </ul>
                <p class="example">Ejemplo: "I visited my grandmother yesterday" = "Visité a mi abuela ayer"</p>
            </div>

            <div class="time-expressions">
                <h5>⏰ Expresiones de Tiempo:</h5>
                <ul>
                    <li>yesterday (ayer)</li>
                    <li>last week/month/year (la semana/mes/año pasado)</li>
                    <li>ago (hace) → two days ago</li>
                </ul>
            </div>
        `,
        tips: [
            'Memoriza los 20 verbos irregulares más comunes',
            'Escribe una historia corta sobre tu fin de semana pasado',
            'Practica: "What did you do yesterday?"'
        ]
    },

    8: {
        introduction: `
            <h4>Planificando el futuro</h4>
            <p>Aprenderás a hablar sobre planes, predicciones y lo que sucederá en el futuro.</p>
            
            <div class="learning-objectives">
                <h5>🎯 Objetivos de Aprendizaje:</h5>
                <ul>
                    <li>Usar "going to" para planes</li>
                    <li>Usar "will" para predicciones</li>
                    <li>Hablar sobre intenciones futuras</li>
                    <li>Hacer promesas y ofrecimientos</li>
                </ul>
            </div>

            <div class="grammar-point">
                <h5>📝 Punto Gramatical:</h5>
                <p><strong>Futuro con "Going to" y "Will"</strong></p>
                <ul>
                    <li>Going to → planes: I'm going to study tonight</li>
                    <li>Will → predicciones/promesas: It will rain tomorrow</li>
                    <li>Won't = will not → I won't be late</li>
                </ul>
                <p class="example">Ejemplo: "I'm going to visit Paris next year" = "Voy a visitar París el próximo año"</p>
            </div>

            <div class="difference-box">
                <h5>🔍 Diferencia Clave:</h5>
                <p><strong>"Going to"</strong> → planes decididos: "I'm going to buy a car"</p>
                <p><strong>"Will"</strong> → decisiones espontáneas: "I'll help you!" (¡Te ayudaré!)</p>
            </div>
        `,
        tips: [
            'Habla sobre tus planes para mañana usando "going to"',
            'Haz predicciones sobre el clima: "It will be sunny"',
            'Practica promesas: "I will call you later"'
        ]
    },

    9: {
        introduction: `
            <h4>Comparando cosas</h4>
            <p>Aprenderás a comparar personas, lugares y cosas usando comparativos y superlativos.</p>
            
            <div class="learning-objectives">
                <h5>🎯 Objetivos de Aprendizaje:</h5>
                <ul>
                    <li>Formar comparativos (bigger, more expensive)</li>
                    <li>Formar superlativos (biggest, most expensive)</li>
                    <li>Comparar dos o más cosas</li>
                    <li>Usar "as...as" para igualdad</li>
                </ul>
            </div>

            <div class="grammar-point">
                <h5>📝 Punto Gramatical:</h5>
                <p><strong>Comparativos y Superlativos</strong></p>
                <ul>
                    <li>Cortos: big → bigger → the biggest</li>
                    <li>Largos: expensive → more expensive → the most expensive</li>
                    <li>Irregulares: good → better → the best</li>
                    <li>Igualdad: as tall as (tan alto como)</li>
                </ul>
                <p class="example">Ejemplo: "My city is bigger than yours" = "Mi ciudad es más grande que la tuya"</p>
            </div>

            <div class="comparison-practice">
                <h5>⚖️ Practica Comparaciones:</h5>
                <ul>
                    <li>A is bigger than B</li>
                    <li>A is the biggest of all</li>
                    <li>A is as big as B</li>
                </ul>
            </div>
        `,
        tips: [
            'Compara objetos a tu alrededor',
            'Usa comparativos en conversaciones diarias',
            'Recuerda: more/most para adjetivos largos'
        ]
    },

    10: {
        introduction: `
            <h4>Hablando de experiencias</h4>
            <p>El presente perfecto te permite hablar sobre experiencias de vida y acciones que afectan el presente.</p>
            
            <div class="learning-objectives">
                <h5>🎯 Objetivos de Aprendizaje:</h5>
                <ul>
                    <li>Usar el presente perfecto (Present Perfect)</li>
                    <li>Hablar sobre experiencias de vida</li>
                    <li>Distinguir entre pasado simple y presente perfecto</li>
                    <li>Usar "ever", "never", "already", "yet"</li>
                </ul>
            </div>

            <div class="grammar-point">
                <h5>📝 Punto Gramatical:</h5>
                <p><strong>Presente Perfecto (Present Perfect)</strong></p>
                <ul>
                    <li>Formación: have/has + participio pasado</li>
                    <li>I have visited (He visitado)</li>
                    <li>She has eaten (Ella ha comido)</li>
                    <li>Negativo: haven't/hasn't + participio</li>
                </ul>
                <p class="example">Ejemplo: "I have been to Paris" = "He estado en París"</p>
            </div>

            <div class="usage-guide">
                <h5>📌 Cuándo Usar:</h5>
                <ul>
                    <li>Experiencias sin tiempo específico: "I have seen that movie"</li>
                    <li>Acciones recientes: "I have just finished"</li>
                    <li>Con "ever" y "never": "Have you ever tried sushi?"</li>
                </ul>
            </div>
        `,
        tips: [
            'Haz una lista de experiencias: "I have..."',
            'Pregunta a otros: "Have you ever...?"',
            'Memoriza participios irregulares comunes'
        ]
    },

    11: {
        introduction: `
            <h4>Condiciones e hipótesis</h4>
            <p>Aprenderás a hablar sobre situaciones hipotéticas y sus consecuencias usando condicionales.</p>
            
            <div class="learning-objectives">
                <h5>🎯 Objetivos de Aprendizaje:</h5>
                <ul>
                    <li>Usar el primer condicional (real)</li>
                    <li>Usar el segundo condicional (hipotético)</li>
                    <li>Expresar causa y efecto</li>
                    <li>Hablar sobre posibilidades</li>
                </ul>
            </div>

            <div class="grammar-point">
                <h5>📝 Punto Gramatical:</h5>
                <p><strong>Condicionales (Conditionals)</strong></p>
                <ul>
                    <li>First: If + present, will + verb → If it rains, I will stay home</li>
                    <li>Second: If + past, would + verb → If I won the lottery, I would travel</li>
                    <li>Zero: If + present, present → If you heat water, it boils</li>
                </ul>
                <p class="example">Ejemplo: "If I study hard, I will pass the exam" = "Si estudio duro, pasaré el examen"</p>
            </div>

            <div class="conditional-types">
                <h5>🔀 Tipos de Condicionales:</h5>
                <ul>
                    <li><strong>First</strong> → Situación real posible (futuro)</li>
                    <li><strong>Second</strong> → Situación hipotética (improbable/imposible)</li>
                    <li><strong>Zero</strong> → Verdades universales</li>
                </ul>
            </div>
        `,
        tips: [
            'Practica haciendo hipótesis: "If I had..."',
            'Piensa en planes futuros con "if"',
            'Usa condicionales en decisiones diarias'
        ]
    },

    12: {
        introduction: `
            <h4>¡Último nivel! Dominando phrasal verbs</h4>
            <p>Los phrasal verbs son esenciales para sonar natural. Aprenderás los más comunes y útiles.</p>
            
            <div class="learning-objectives">
                <h5>🎯 Objetivos de Aprendizaje:</h5>
                <ul>
                    <li>Entender qué son los phrasal verbs</li>
                    <li>Usar los 20 phrasal verbs más comunes</li>
                    <li>Distinguir phrasal verbs separables e inseparables</li>
                    <li>Aplicarlos en conversación natural</li>
                </ul>
            </div>

            <div class="grammar-point">
                <h5>📝 Punto Gramatical:</h5>
                <p><strong>Phrasal Verbs (Verbos Frasales)</strong></p>
                <ul>
                    <li>Verbo + Partícula = Nuevo significado</li>
                    <li>Look (ver) + up = Look up (buscar información)</li>
                    <li>Give (dar) + up = Give up (rendirse)</li>
                    <li>Separables: "Turn off the light" o "Turn the light off"</li>
                    <li>Inseparables: "Look after the baby" (NO: Look the baby after)</li>
                </ul>
            </div>

            <div class="common-phrasal-verbs">
                <h5>⭐ 10 Más Comunes:</h5>
                <ul>
                    <li>get up (levantarse)</li>
                    <li>wake up (despertar)</li>
                    <li>give up (rendirse)</li>
                    <li>look for (buscar)</li>
                    <li>turn on/off (encender/apagar)</li>
                </ul>
            </div>

            <div class="congratulations">
                <h5>🎉 ¡Felicitaciones!</h5>
                <p>Estás a punto de completar todos los niveles de Gaell English Academy. Has recorrido un largo camino 
                desde los saludos básicos hasta estructuras gramaticales complejas. ¡Sigue practicando!</p>
            </div>
        `,
        tips: [
            'Aprende phrasal verbs en contexto, no aislados',
            'Crea oraciones propias con cada phrasal verb',
            'Escucha música y podcasts para escucharlos naturalmente'
        ]
    }
};
