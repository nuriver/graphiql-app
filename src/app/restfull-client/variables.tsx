'use client';
import { useState } from 'react';

interface Variable {
  key: string;
  value: string;
}

export default function Variables() {
  const [variableKey, setVariableKey] = useState('');
  const [variableValue, setVariableValue] = useState('');
  const [variables, setVariables] = useState<Variable[]>([]);

  const isDisabled = variableKey.trim() === '' || variableValue.trim() === '';

  const handleAddVariable = () => {
    const newVariable = { key: variableKey, value: variableValue };
    setVariables([...variables, newVariable]);
    setVariableKey('');
    setVariableValue('');
  };
  return (
    <div className="request__variables">
      <select id="select-variable" className="rest__select">
        <option value="">Variables (key: value)</option>
        {variables.map((variable, index) => (
          <option key={index} value={variable.value}>
            {variable.key}: {variable.value}
          </option>
        ))}
      </select>

      <div className="variables__add-variable">
        <label htmlFor="variable-key" className="rest__label">
          Key
        </label>
        <input
          id="variable-key"
          value={variableKey}
          type="text"
          className="rest__input"
          onChange={(item) => setVariableKey(item.target.value)}
        />
        <label htmlFor="variable-value" className="rest__label">
          Value
        </label>
        <input
          id="variable-value"
          value={variableValue}
          type="text"
          className="rest__input"
          onChange={(item) => setVariableValue(item.target.value)}
        />

        <button
          disabled={isDisabled}
          className="rest__button"
          onClick={handleAddVariable}
        >
          Add variable
        </button>
      </div>
      <div className="variables__add-variable"></div>
    </div>
  );
}
