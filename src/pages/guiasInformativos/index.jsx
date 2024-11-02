
export default function GuiasInformativos() {
    const textoPadrao = 'text-sm sm:text-base text-justify'
    const ulPadrao = 'mt-1 flex flex-col gap-2 list-disc pl-3 sm:pl-6'
    const liPadrao = 'text-sm sm:text-base'
    const h2Padrao = 'text-base sm:text-xl lg:text-2xl font-semibold'
    const h3andh4Padrao = "text-sm sm:text-base font-semibold text-cyan-600"

    return (
        <div className="containerPadrao !my-6 sm:!my-8 bg-white rounded-md p-4 sm:p-6 shadow-md !text-zinc-900 gap-4">
            <h1 className="text-lg sm:text-xl lg:text-2xl xl:text-3xl font-bold">
                Guia Completo: Como Escolher as Peças Certas para Montar Seu Computador
            </h1>
            <p className={"text-sm text-zinc-500"}>
                02 de novembro de 2024 | Tech Insights
            </p>

            <p className={textoPadrao}>
                Montar um computador pode parecer uma tarefa complicada, mas com o guia certo,
                qualquer pessoa pode aprender a escolher as peças certas e criar uma máquina que
                atenda às suas necessidades. Aqui, vou detalhar todos os componentes essenciais de um PC,
                explicar suas funções, dar dicas de escolha e oferecer conselhos para garantir que você monte
                um computador funcional e eficiente. Vamos começar!
            </p>

            <section className="flex flex-col gap-3 mt-4 sm:mt-6">
                <h2 className={h2Padrao}>1. Processador (CPU)</h2>
                <p className={textoPadrao}>
                    O processador é o cérebro do computador. Ele executa comandos e realiza cálculos. A escolha do processador vai depender do que você pretende fazer com o seu PC. Para atividades como navegação na internet, edição de textos e vídeos leves, um processador intermediário pode ser suficiente. Para jogos, edição de vídeo 4K ou modelagem 3D, você vai precisar de algo mais potente.
                </p>
                <div>
                    <h3 className={h3andh4Padrao}>Marcas principais:</h3>
                    <ul className={ulPadrao}>
                        <li className={liPadrao}><strong>Intel:</strong> Séries populares como i3 (básico), i5 (intermediário), i7 e i9 (alto desempenho).</li>
                        <li className={liPadrao}><strong>AMD:</strong> Ryzen 3 (básico), Ryzen 5 (intermediário), Ryzen 7 e Ryzen 9 (alto desempenho).</li>
                    </ul>
                </div>
                <div className="bg-zinc-50 border-l-4 border-cyan-600 p-4 mt-2">
                    <h4 className={h3andh4Padrao}>Dicas:</h4>
                    <ul className={ulPadrao}>
                        <li className={liPadrao}>Verifique a frequência base e número de núcleos. Mais núcleos e threads ajudam em multitarefas e aplicações pesadas.</li>
                        <li className={liPadrao}>Considere a compatibilidade da placa-mãe (veja o próximo item).</li>
                        <li className={liPadrao}>Processadores de gerações mais recentes geralmente oferecem melhorias significativas em desempenho e eficiência energética em comparação com as gerações anteriores.</li>
                        <li className={liPadrao}>Por exemplo, um processador i7-11700 seria da 11ª geração, enquanto um i7-12700 seria da 12ª geração.</li>
                    </ul>
                </div>
            </section>

            <section className="flex flex-col gap-3 mt-4 sm:mt-6">
                <h2 className={h2Padrao}>2. Placa-mãe</h2>
                <p className={textoPadrao}>
                    A placa-mãe conecta todos os componentes e permite que eles se comuniquem. Ela precisa ser compatível com o processador escolhido e oferecer os recursos necessários para o seu uso, como quantidade de portas USB, suporte a memória RAM e capacidade de expansão.
                </p>
                <div>
                    <h3 className={h3andh4Padrao}>Tipos principais:</h3>
                    <ul className={ulPadrao}>
                        <li className={liPadrao}><strong>ATX:</strong> Tamanho padrão, oferece mais slots de expansão.</li>
                        <li className={liPadrao}><strong>Micro-ATX:</strong> Menor, mas ainda com boas opções de slots.</li>
                        <li className={liPadrao}><strong>Mini-ITX:</strong> Compacta, ideal para PCs pequenos, mas com menos espaço para expansões.</li>
                    </ul>
                </div>
                <div className="bg-zinc-50 border-l-4 border-cyan-600 p-4 mt-2">
                    <h4 className={h3andh4Padrao}>Dicas:</h4>
                    <ul className={ulPadrao}>
                        <li className={liPadrao}>Verifique a compatibilidade de socket (ex.: LGA 1200 para Intel, AM4 para AMD). O socket tem relação direta com o processador.</li>
                        <li className={liPadrao}>Certifique-se de que a placa-mãe suporta a quantidade e tipo de memória RAM que você quer usar (DDR4, DDR5, etc.).</li>
                        <li className={liPadrao}>Observe quantos slots PCIe a placa tem, caso queira conectar placas adicionais, como de vídeo ou som.</li>
                    </ul>
                </div>
            </section>

            <section className="flex flex-col gap-3 mt-4 sm:mt-6">
                <h2 className={h2Padrao}>3. Memória RAM</h2>
                <p className={textoPadrao}>
                    A RAM é a memória de curto prazo do seu computador, onde dados de programas em uso são armazenados temporariamente. Para uso básico, 8 GB são suficientes. Para jogos ou multitarefas pesadas, 16 GB ou mais são recomendados.
                </p>
                <div>
                    <h3 className={h3andh4Padrao}>Tipos principais:</h3>
                    <ul className={ulPadrao}>
                        <li className={liPadrao}><strong>DDR4:</strong> Mais comum atualmente.</li>
                        <li className={liPadrao}><strong>DDR5:</strong> Nova geração, mais rápida, mas mais cara.</li>
                    </ul>
                </div>
                <div className="bg-zinc-50 border-l-4 border-cyan-600 p-4 mt-2">
                    <h4 className={h3andh4Padrao}>Dicas:</h4>
                    <ul className={ulPadrao}>
                        <li className={liPadrao}>Verifique a frequência (ex.: 3200 MHz) e latência para ter uma ideia da performance.</li>
                        <li className={liPadrao}>Certifique-se de que a placa-mãe suporta a quantidade de memória que você deseja instalar.</li>
                    </ul>
                </div>
            </section>

            <section className="flex flex-col gap-3 mt-4 sm:mt-6">
                <h2 className={h2Padrao}>4. Armazenamento (HDD e SSD)</h2>
                <p className={textoPadrao}>
                    O armazenamento é onde os seus dados são guardados. Existem dois tipos principais:
                </p>
                <div>
                    <h3 className={h3andh4Padrao}>Tipos principais:</h3>
                    <ul className={ulPadrao}>
                        <li className={liPadrao}><strong>HDD (Disco Rígido):</strong> Mais barato e com grande capacidade de armazenamento, mas mais lento.</li>
                        <li className={liPadrao}><strong>SSD (Solid State Drive):</strong> Muito mais rápido, ideal para o sistema operacional e programas.</li>
                    </ul>
                </div>
                <div className="bg-zinc-50 border-l-4 border-cyan-600 p-4 mt-2">
                    <h4 className={h3andh4Padrao}>Dicas:</h4>
                    <ul className={ulPadrao}>
                        <li className={liPadrao}>Use um SSD de 256 GB ou 512 GB para o sistema operacional e programas essenciais, e um HDD de 1 TB ou mais para armazenar arquivos grandes como fotos e vídeos.</li>
                        <li className={liPadrao}>Para melhor desempenho, considere um NVMe SSD, que é ainda mais rápido que um SSD padrão.</li>
                    </ul>
                </div>
            </section>

            <section className="flex flex-col gap-3 mt-4 sm:mt-6">
                <h2 className={h2Padrao}>5. Placa de Vídeo (GPU)</h2>
                <p className={textoPadrao}>
                    A placa de vídeo é essencial para quem joga ou trabalha com gráficos intensos (edição de vídeo, modelagem 3D). Se você só usa o computador para navegar na internet, uma GPU integrada ao processador pode ser suficiente.
                </p>
                <div>
                    <h3 className={h3andh4Padrao}>Marcas principais:</h3>
                    <ul className={ulPadrao}>
                        <li className={liPadrao}><strong>NVIDIA:</strong> Modelos populares incluem GeForce GTX e RTX (ex.: RTX 3060, RTX 4080).</li>
                        <li className={liPadrao}><strong>AMD:</strong> Modelos como Radeon RX 6600, RX 7900.</li>
                    </ul>
                </div>
                <div className="bg-zinc-50 border-l-4 border-cyan-600 p-4 mt-2">
                    <h4 className={h3andh4Padrao}>Dicas:</h4>
                    <ul className={ulPadrao}>
                        <li className={liPadrao}>Verifique a quantidade de VRAM. Para jogos modernos, pelo menos 6 GB de VRAM são recomendados.</li>
                        <li className={liPadrao}>Considere a eficiência energética e o tamanho da placa para caber no gabinete.</li>
                    </ul>
                </div>
            </section>

            <section className="flex flex-col gap-3 mt-4 sm:mt-6">
                <h2 className={h2Padrao}>6. Fonte de Alimentação (PSU)</h2>
                <p className={textoPadrao}>
                    A fonte de alimentação fornece energia para todos os componentes do computador. É crucial escolher uma fonte de boa qualidade para garantir a estabilidade do sistema e evitar danos.
                </p>
                <div className="bg-zinc-50 border-l-4 border-cyan-600 p-4 mt-2">
                    <h4 className={h3andh4Padrao}>Dicas:</h4>
                    <ul className={ulPadrao}>
                        <li className={liPadrao}>Calcule o consumo total de energia usando ferramentas online como a: <a className="text-cyan-600 underline" href="https://outervision.com/power-supply-calculator" target="_blank" rel="noopener noreferrer">OuterVision
                        </a>, para escolher a potência correta (ex.: 500W, 750W).
                        </li>
                        <li className={liPadrao}>Opte por fontes com certificação 80 Plus (Bronze, Gold, Platinum) para melhor eficiência energética.</li>
                        <li className={liPadrao}>Escolha uma fonte modular ou semi-modular para facilitar a organização dos cabos.</li>
                    </ul>
                </div>
            </section>

            <section className="flex flex-col gap-3 mt-4 sm:mt-6">
                <h2 className={h2Padrao}>7. Gabinete</h2>
                <p className={textoPadrao}>
                    O gabinete é onde todos os componentes ficam alojados. Ele deve ser compatível com o tamanho da placa-mãe e ter espaço suficiente para a placa de vídeo e outras expansões.
                </p>
                <div className="bg-zinc-50 border-l-4 border-cyan-600 p-4 mt-2">
                    <h4 className={h3andh4Padrao}>Dicas:</h4>
                    <ul className={ulPadrao}>
                        <li className={liPadrao}>Verifique a ventilação e suporte a fans adicionais.</li>
                        <li className={liPadrao}>Considere um gabinete com filtros de poeira e painéis laterais transparentes se quiser uma aparência mais moderna.</li>
                    </ul>
                </div>
            </section>

            <section className="flex flex-col gap-3 mt-4 sm:mt-6">
                <h2 className={h2Padrao}>8. Sistemas de Resfriamento</h2>
                <p className={textoPadrao}>
                    O resfriamento é necessário para manter a temperatura do processador e da GPU em níveis seguros. Pode ser air cooler (ar) ou water cooler (líquido).
                </p>
                <div className="bg-zinc-50 border-l-4 border-cyan-600 p-4 mt-2">
                    <h4 className={h3andh4Padrao}>Dicas:</h4>
                    <ul className={ulPadrao}>
                        <li className={liPadrao}>Um air cooler de boa qualidade é suficiente para a maioria dos usos. Para overclock ou cargas intensas, considere um water cooler.</li>
                        <li className={liPadrao}>Certifique-se de que o cooler cabe no gabinete e é compatível com o socket da CPU.</li>
                    </ul>
                </div>
            </section>

            <section className="flex flex-col gap-3 mt-4 sm:mt-6">
                <h2 className={h2Padrao}>9. Periféricos</h2>
                <p className={textoPadrao}>
                    Embora não sejam parte do PC em si, os periféricos são importantes:
                </p>
                <div className="bg-zinc-50 border-l-4 border-cyan-600 p-4 mt-2">
                    <h4 className={h3andh4Padrao}>Dicas:</h4>
                    <ul className={ulPadrao}>
                        <li className={liPadrao}><strong>Monitor:</strong> Escolha de acordo com a placa de vídeo (Full HD, 4K, taxa de atualização).</li>
                        <li className={liPadrao}><strong>Teclado e mouse:</strong> Escolha modelos confortáveis, especialmente se você joga ou digita muito.</li>
                        <li className={liPadrao}><strong>Headset ou caixa de som:</strong> Para áudio de qualidade.</li>
                    </ul>
                </div>
            </section>

            <section className="flex flex-col gap-3 mt-6">
                <h2 className={h2Padrao}>Considerações Finais</h2>
                <p className={textoPadrao}>
                    Montar um PC é uma tarefa que exige cuidado e planejamento. Antes de começar, é fundamental verificar a compatibilidade entre todas as peças para garantir que funcionem juntas sem problemas. Tenha paciência durante a montagem e, se você não tiver experiência, considere consultar vídeos tutoriais ou pedir ajuda a alguém mais familiarizado com o processo.
                </p>

                <p className={textoPadrao}>
                    Durante a montagem, tome cuidado para não danificar componentes sensíveis e evite forçar qualquer peça no lugar. Se em algum momento você se sentir inseguro ou não souber como proceder, é melhor levar seu equipamento a um profissional qualificado. Um erro na montagem pode resultar em danos que podem ser evitados com a orientação certa.
                </p>

                <p className={textoPadrao}>
                    Após montar tudo, não se esqueça de realizar um teste de inicialização antes de fixar todos os cabos e componentes. E, claro, instale um sistema operacional de sua escolha (como Windows ou uma distribuição Linux) para dar vida ao seu novo computador.
                </p>

                <p className={textoPadrao}>
                    Com essas dicas, você está pronto para montar seu próprio computador e aproveitar uma máquina feita sob medida para suas necessidades!
                </p>
                <div className="bg-zinc-50 border-l-4 border-cyan-600 p-4 mt-2">
                    <h3 className={h3andh4Padrao}>Boa sorte na sua montagem!</h3>
                    <p className={textoPadrao}>
                        Não hesite em compartilhar suas experiências ou dúvidas com nossa equipe. Estamos aqui para te ajudar!
                    </p>
                </div>
            </section>

        </div>
    )
}