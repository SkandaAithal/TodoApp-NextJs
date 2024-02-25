import Todos from "../components/Todos";

export default function Home() {
  return (
    <main>
      <div className="grid place-content-center text-orange-700 text-2xl sm:text-4xl font-bold p-8 ">
        <h1>Todo APP</h1>
      </div>
      <div className="grid place-content-center">
        <Todos />
      </div>
    </main>
  );
}
