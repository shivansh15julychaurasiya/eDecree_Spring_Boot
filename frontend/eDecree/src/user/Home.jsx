const Home = () => {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Dashboard</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-blue-500 text-white p-4 rounded shadow">
          Total Cases: 120
        </div>
        <div className="bg-green-500 text-white p-4 rounded shadow">
          Approved: 80
        </div>
        <div className="bg-red-500 text-white p-4 rounded shadow">
          Pending: 40
        </div>
      </div>
    </div>
  );
};

export default Home;