import { Link } from "react-router-dom";

export default function Home() {
  return (
    <>
      <header className="h-[80vh]">
        <div className="flex flex-row justify-center items-center h-3/4">
          <div className="w-96">
            <img src="./party.png" className="object-contain"></img>
          </div>

          <div>
            <h1 className="text-5xl text-dutch-white">
              Adventure is just
              <br /> a few clicks away!
            </h1>
            <div className="relative left-1/4">
              <button className="block bg-tea-green px-8 py-2 m-2 rounded-full">
                <Link to='/register'>Sign Up</Link>
              </button>
              <button className="block border-tea-green border-2 text-tea-green px-8 py-2 m-2 rounded-full">
              <Link to='/campaigns'>Explore</Link>
              </button>
            </div>
          </div>
        </div>
        <div className="bg-tea-green text-xl relative top-1/3 w-full h-10">
          <p>Scroll down to learn more!</p>
        </div>
      </header>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <main className="text-dutch-white m-0">
        <p>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Assumenda
          eos, sapiente hic provident obcaecati odit dicta asperiores voluptatem
          voluptatibus repellendus! Sequi eius distinctio autem sunt
          voluptatibus fugiat ipsa repellat praesentium!
        </p>
      </main>
      <footer></footer>
    </>
  );
}
