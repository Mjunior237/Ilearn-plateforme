export default function TestPage() {
  return (
    <div className="p-8">
      <div className="mb-8 p-4 bg-red-100 border-2 border-red-500">
        <h1 className="text-3xl font-bold text-red-700">⚠️ TEST TAILWIND ⚠️</h1>
        <p className="text-red-600">Si vous voyez ce message en rouge, Tailwind NE FONCTIONNE PAS</p>
      </div>
      
      <div className="grid grid-cols-3 gap-4 mb-8">
        <div className="bg-blue-500 text-white p-4 rounded-lg">Bleu</div>
        <div className="bg-green-500 text-white p-4 rounded-lg">Vert</div>
        <div className="bg-purple-500 text-white p-4 rounded-lg">Violet</div>
      </div>
      
      <button className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg shadow-lg hover:shadow-xl">
        Bouton test Tailwind
      </button>
      
      <div className="mt-8">
        <h2 className="text-2xl font-bold mb-4">Classes appliquées:</h2>
        <pre className="bg-gray-100 p-4 rounded text-sm">
          {JSON.stringify({
            'div-parent': 'p-8',
            'test-box': 'bg-red-100 border-2 border-red-500',
            'title': 'text-3xl font-bold text-red-700',
            'grid': 'grid grid-cols-3 gap-4',
            'button': 'px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg shadow-lg'
          }, null, 2)}
        </pre>
      </div>
    </div>
  );
}