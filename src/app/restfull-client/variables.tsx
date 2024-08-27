'use client';
import { useState } from 'react';

interface Variable {
  name: string;
  value: string;
}

export default function Variables() {
  const [variableName, setVariableName] = useState('');
  const [variableValue, setVariableValue] = useState('');
  const [variables, setVariables] = useState<Variable[]>([]);

  const isDisabled = variableName.trim() === '' || variableValue.trim() === '';

  const handleAddVariable = () => {
    const newVariable = { name: variableName, value: variableValue };
    setVariables([...variables, newVariable]);
    setVariableName('');
    setVariableValue('');
  };
  return (
    <div className="request__variables">
      <select id="select-variable" className="rest__select">
        <option value="">Variables (name: value)</option>
        {variables.map((variable, index) => (
          <option key={index} value={variable.value}>
            {variable.name}: {variable.value}
          </option>
        ))}
      </select>

      <div className="variables__add-variable">
        <input
          id="variable-name"
          type="text"
          placeholder="Variable Name"
          value={variableName}
          className="rest__input"
          onChange={(item) => setVariableName(item.target.value)}
        />
        <input
          id="variable-value"
          type="text"
          placeholder="Variable Value"
          value={variableValue}
          className="rest__input"
          onChange={(item) => setVariableValue(item.target.value)}
        />

        <button
          disabled={isDisabled}
          className="rest__button"
          onClick={handleAddVariable}
        >
          Add Variable
        </button>
      </div>
      <div className="variables__add-variable"></div>
    </div>
  );
}
