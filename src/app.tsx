import { PlayGame } from "./components/PlayGame";
import "./app.css";
import { Routes, Route, Outlet, Link } from "react-router-dom";
import { MUSHROOMS } from "./core/mushrooms";
import { useState } from "preact/hooks";
import { MushroomType } from "./types/mushroom-type";
import { Mushroom } from "./types/mushroom";

function toTitleCase(string: string) {
  return string
    .toLowerCase()
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

export function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="play" element={<PlayGame />} />
          <Route path="about" element={<About />} />
          <Route path="*" element={<NoMatch />} />
        </Route>
      </Routes>
    </div>
  );
}
function Layout() {
  return (
    <div>
      <nav>
        <Link to="/">
          <img src="logo_grzybobranie.svg" alt="" />
        </Link>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/play">Play game</Link>
          </li>
          <li>
            <Link to="/about">About</Link>
          </li>
        </ul>
      </nav>
      <Outlet />
    </div>
  );
}
function Home() {
  const [filter, setFilter] = useState("all");

  const handleFilterChange = (newFilter: string) => {
    setFilter(newFilter);
  };

  const filteredMushrooms = MUSHROOMS.filter((mushroom: Mushroom) => {
    if (filter === "all") {
      return true;
    } else if (filter === MushroomType.POISONOUS) {
      return mushroom.type === MushroomType.POISONOUS;
    } else {
      return mushroom.type === MushroomType.EATABLE;
    }
  });
  return (
    <>
      <section className="home-header">
        <h1>Explor the forest</h1>
        <p>Challenge your Polishness!</p>
        <section>
          <button
            className="chip-all"
            onClick={() => handleFilterChange("all")}
          >
            All
          </button>
          <button
            className="chip-eatable"
            onClick={() => handleFilterChange(MushroomType.EATABLE)}
          >
            Edible
          </button>
          <button
            className="chip-poisonous"
            onClick={() => handleFilterChange(MushroomType.POISONOUS)}
          >
            Poisonous
          </button>
        </section>
      </section>
      <div className="mushrooms">
        {filteredMushrooms.map((m) => (
          <div key={m.id} className="flip-card mushroom">
            <div className="flip-card-inner">
              <div className="flip-card-front">
                <img src={`${m.name}` + ".png"} alt={m.name} />
              </div>
              <div className="flip-card-back">
                <h1>{toTitleCase(m.name)}</h1>
                <p
                  className={
                    m.type === MushroomType.EATABLE
                      ? "chip-eatable"
                      : "chip-poisonous"
                  }
                >
                  {toTitleCase(m.type)}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

function About() {
  return (
    <div>
      <span>Illustrator:</span>
      <div>
        <h2>Natalia Zaremba</h2>
        <a href="https://www.instagram.com/nat.designer/">Instagram</a>
      </div>
      <hr />
      <span>Developer:</span>
      <div>
        <h2>Hamed Sedighi</h2>
        <a href="https://github.com/herol3oy/femalerockers">Github</a>
      </div>
    </div>
  );
}

function NoMatch() {
  return (
    <>
      <h2>No mushroom here!</h2>
      <p>
        <Link to="/">Go to back to the forest</Link>
      </p>
    </>
  );
}
