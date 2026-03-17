peso 10 - risco crítico ou exigência legal
peso 5 a 8 - riscos moderados ou falta de controles preventivos
peso 0 - perguntas informativas mais voltadas ao fluxos das perguntas

o sistema não considera o questionário inteiro, mas só o que foi respondido
para um exemplo, para cada "efluentes" o sistema calcula o PESO TOTAL RESPONDIDO (Ptotal):

Ptotal = *somatória* (peso de todas as perguntas respondidas naquela categoria)

//////////////////////////////////////////////////////////////////////////////////////////

sempre que o usuário responde algo que corresponde ao "trigger", o sistema isola esse peso
o sistema calcula a SOMA DO RISCO (Prisco)

Prisco = *somatória* (pesos das persuntas onde a respota foi igual ao trigger)

//////////////////////////////////////////////////////////////////////////////////////////

para transformar isso no quadro de porcentagens:

.               (     Prisco   )
Coformidade =   ( 1 - ------   )  X 100
.               (     Ptotal   )


Exemplo Prático
categoria: Químicos

1. Possui controle de estoque? (peso 10) -> se "sim" (seguro, o gatilho não dispara)
2. Tem Sinalização no local? (peso 5) -> se "não" (risco, o gatilho dispara
3. Possui fichas técnicas? (peso 5) -> se "sim" (seguro, o gatilho não dispara)

Ptotal: 10 + 5 + 5 = 20
Prisco: 5 (apenas da pergunta 2)
calculo: 1 - (5/20) = 0.75
resultado: 75% de conformidade em QUÍMICOS

categoria: geral

1. a atividade industrial está licenciada? (peso 10) -> se "sim" (seguro, o gatilho não dispara)
2. o CNAE principal condiz com o CNPJ? (peso 09) -> se "não" (risco, gatilho não dispara)
3. todas as atividades constam no CNAE? (peso 9) -> se "sim" (seguro, o gatilho não dispara)

Ptotal: 10 + 9 + 9 = 28
Prisco: 9 (apenas a que o gatilho disparou)
calculo: 9/28 ~ 0,32 (32% da categoria está em risco) (1 - 0,32) X 100 = 68%

