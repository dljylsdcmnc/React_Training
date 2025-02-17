import React, { useState } from 'react';
import { Plus, Minus, RotateCcw, Calculator } from 'lucide-react';

const App = () => {
  const [count, setCount] = useState(0);
  const [inputs, setInputs] = useState([{ num1: '', num2: '', result: null }]);

  const handleCount = (operation) => {
    switch (operation) {
      case 'increment':
        setCount(prev => prev + 1);
        break;
      case 'decrement':
        setCount(prev => (prev > 0 ? prev - 1 : 0));
        break;
      case 'reset':
        setCount(0);
        break;
    }
  };

  const calculate = (index, operation) => {
    const { num1, num2 } = inputs[index];
    if (!num1 || !num2) return;

    const n1 = parseFloat(num1);
    const n2 = parseFloat(num2);
    
    let result;
    switch (operation) {
      case 'add':
        result = n1 + n2;
        break;
      case 'subtract':
        result = n1 - n2;
        break;
      case 'multiply':
        result = n1 * n2;
        break;
      case 'divide':
        result = n2 !== 0 ? n1 / n2 : 'Error';
        break;
    }

    const newInputs = [...inputs];
    newInputs[index] = { 
      ...newInputs[index], 
      result: typeof result === 'number' ? Number(result.toFixed(2)) : result 
    };
    setInputs(newInputs);
  };

  return (
    <div className="min-h-screen w-screen flex flex-col items-center justify-center bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 p-4">
      <div className="w-full max-w-4xl space-y-8">
        {/* Counter Section */}
        <div className="bg-white/10 backdrop-blur-md rounded-2xl shadow-xl overflow-hidden border border-white/20 p-6 w-full">
          <h2 className="text-3xl font-bold text-white text-center mb-4">Counter</h2>
          <div className="text-center text-4xl font-bold text-white mb-4">{count}</div>
          <div className="flex flex-wrap gap-4 justify-center">
            <button onClick={() => handleCount('increment')} className="bg-blue-500 hover:bg-emerald-600 text-white px-6 py-3 rounded-xl flex items-center gap-2">
              <Plus className="h-5 w-5" /> Increment
            </button>
            <button onClick={() => handleCount('decrement')} className="bg-blue-500 hover:bg-amber-600 text-white px-6 py-3 rounded-xl flex items-center gap-2">
              <Minus className="h-5 w-5" /> Decrement
            </button>
            <button onClick={() => handleCount('reset')} className="bg-blue-500 hover:bg-rose-600 text-white px-6 py-3 rounded-xl flex items-center gap-2">
              <RotateCcw className="h-5 w-5" /> Reset
            </button>
          </div>
        </div>

        {/* Calculator Section */}
        <div className="bg-white/10 backdrop-blur-md rounded-2xl shadow-xl overflow-hidden border border-white/20 p-6 w-full">
          <div className="flex items-center gap-3 mb-4">
            <Calculator className="h-8 w-8 text-white" />
            <h2 className="text-3xl font-bold text-white">Calculator</h2>
          </div>

          {inputs.map((input, index) => (
            <div key={index} className="bg-white/10 rounded-xl p-4 backdrop-blur-sm">
              <div className="grid gap-4">
                <input
                  type="number"
                  value={input.num1}
                  onChange={(e) => {
                    const newInputs = [...inputs];
                    newInputs[index] = { ...newInputs[index], num1: e.target.value, result: null };
                    setInputs(newInputs);
                  }}
                  placeholder="Enter first number"
                  className="w-full bg-white/20 text-white placeholder-white/60 px-4 py-3 rounded-xl"
                />
                <input
                  type="number"
                  value={input.num2}
                  onChange={(e) => {
                    const newInputs = [...inputs];
                    newInputs[index] = { ...newInputs[index], num2: e.target.value, result: null };
                    setInputs(newInputs);
                  }}
                  placeholder="Enter second number"
                  className="w-full bg-white/20 text-white placeholder-white/60 px-4 py-3 rounded-xl"
                />

                <div className="grid grid-cols-2 gap-4">
                  <button onClick={() => calculate(index, 'add')} className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-xl">Add</button>
                  <button onClick={() => calculate(index, 'subtract')} className="bg-purple-500 hover:bg-purple-600 text-white px-6 py-3 rounded-xl">Subtract</button>
                  <button onClick={() => calculate(index, 'multiply')} className="bg-indigo-500 hover:bg-indigo-600 text-white px-6 py-3 rounded-xl">Multiply</button>
                  <button onClick={() => calculate(index, 'divide')} className="bg-violet-500 hover:bg-violet-600 text-white px-6 py-3 rounded-xl">Divide</button>
                </div>

                {input.result !== null && (
                  <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4 text-center">
                    <span className="text-2xl font-bold text-white">Result: {input.result}</span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default App;