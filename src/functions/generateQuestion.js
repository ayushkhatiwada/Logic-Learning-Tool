const generateQuestion = (level) => {
  const connStr = [" ∨ ", " ∧ ", " → ", " ↔ "];

  function conFunc(P, Q) {
    return P && Q;
  }

  function disFunc(P, Q) {
    return P || Q;
  }

  function implyFunc(P, Q) {
    return !P || Q;
  }

  function biimplyFunc(P, Q) {
    return P === Q;
  }

  const connFuncs = [disFunc, conFunc, implyFunc, biimplyFunc];

  const nProp = level + 1;
  const V = [];
  for (let i = 0; i < nProp; i++) {
    V.push(String.fromCharCode(Math.floor(Math.random() * (65 + i - 65 + 1)) + 65));
  }
  const V_s = [...V];

  const propValDict = {};

  const VNoDup = [...new Set(V)];

  VNoDup.forEach((varName) => {
    propValDict[varName] = Math.round(Math.random());
  });

  const questionElements = [];
  const elementsAnswers = [];

  V.forEach((value, index) => {
    V[index] = propValDict[value];
  });

  while (V.length > 1) {
    const i = Math.floor(Math.random() * (V.length - 1));
    const c_i = Math.floor(Math.random() * connStr.length);

    V_s[i] = `(${V_s[i]}${connStr[c_i]}${V_s[i + 1]})`;
    V_s.splice(i + 1, 1);

    questionElements.push(V_s[i].substring(1, V_s[i].length - 1));

    V[i] = connFuncs[c_i](V[i], V[i + 1]);
    V.splice(i + 1, 1);

    elementsAnswers.push(V[i]);
  }

  return [propValDict, questionElements, elementsAnswers];
}

export default generateQuestion
