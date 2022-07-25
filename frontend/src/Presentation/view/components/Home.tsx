import { Link } from "react-router-dom";

export default function Home() {
  return (
    <>
      <header className="h-[75vh]">
        <div className="flex sm:flex-row flex-col justify-center items-center h-3/4">
          <div className="w-96 sm:mt-16 mt-36">
            <img src="./party.png" className="object-contain"></img>
          </div>

          <div>
            <h1 className="sm:text-5xl text-3xl text-dutch-white m-auto">
              Adventure is just
              <br /> a few clicks away!
            </h1>
            <div>
              <button className="block bg-tea-green px-8 py-2 mx-auto my-2 rounded-full">
                <Link to="/register">Sign Up</Link>
              </button>
              <button className="block border-tea-green border-2 text-tea-green px-8 py-2 mx-auto my-2 rounded-full">
                <Link to="/campaigns">Explore</Link>
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
        <h2 className="text-2xl text-blue-munsell">What is The Table?</h2>
        <hr/>
        <p>
          The Table is an online multiplayer tabletop app where you can play DND
          5e for free
        </p>

        <h2 className="text-2xl text-blue-munsell">What can I do with The Table?</h2>
        <hr/>
        <section className="flex justify-center items-center">
          <p className="inline w-1/3">On The Table you can create a campaign and host a session that other players can join. From there you can create campaign resources like character sheets and handouts to distribute to other players.</p>
          <img className="inline w-1/3 object-contain" src='example-1.png' />
        </section>
      </main>
      <footer></footer>
    </>
  );
}
