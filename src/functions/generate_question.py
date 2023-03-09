def generate_question(level):
    conn_str = [" ∨ ", " ∧ ", " → ", " ↔ "]

    def conFunc(P, Q):
        return (P and Q)

    def disFunc(P, Q):
        return (P or Q)

    def implyFunc(P, Q):
        return ((not P) or Q)

    def biimplyFunc(P, Q):
        return (P == Q)

    conn_funcs = [disFunc, conFunc, implyFunc, biimplyFunc]

    n_prop = level + 1
    V = []
    for i in range(n_prop):
        V.append(random.choice([chr(random.randint(65, 65 + i)), chr(65 + i)]))
    V_s = V.copy()

    prop_val_dict = {}

    V_no_dup = list(set(V))

    for var in V_no_dup:
        prop_val_dict[var] = random.randint(0, 1)

    question_elements = []
    elements_answers = []

    for index, value in enumerate(V):
        V[index] = prop_val_dict[value]

    while len(V) > 1:
        i = random.randint(0, len(V) - 2)
        c_i = random.randint(0, len(conn_str) - 1)

        V_s[i] = "(" + V_s[i] + conn_str[c_i] + V_s[i + 1] + ")"
        del V_s[i + 1]

        question_elements.append(V_s[i][1:-1])

        V[i] = conn_funcs[c_i](V[i], V[i + 1])
        del V[i + 1]

        elements_answers.append(V[i])

    print(prop_val_dict)
    print(question_elements)
    print(elements_answers)
    return prop_val_dict, question_elements, elements_answers