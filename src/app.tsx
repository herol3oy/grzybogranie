import { MemoryGame } from "./components/MemoryGame";
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
          <Route path="play" element={<MemoryGame />} />
          <Route path="*" element={<NoMatch />} />
        </Route>
      </Routes>
    </div>
  );
}
function Layout() {
  return (
    <>
      <nav>
        <Link to="/">
          <img src="logo_grzybobranie.svg" alt="Grzybobranie logo" />
        </Link>
        <Link to="/play">
          <button>Play Memory Game</button>
        </Link>
      </nav>
      <Outlet />
    </>
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
        <section className="credits">
          <div>
            <small>Designer & illustrator:</small>
            <a href="https://www.instagram.com/nat.designer/">
              <p>
                <b>Natalia Zaremba</b>
              </p>
            </a>
          </div>
          <div>
            <small>Developer:</small>
            <a href="https://github.com/herol3oy/">
              <p>
                <b>Hamed Sedighi</b>
              </p>
            </a>
          </div>
        </section>
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
