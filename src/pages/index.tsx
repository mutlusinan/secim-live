import MenuItems from "../assets/data/MenuItems.json";

export default function Home() {
  return (
    <div className="main-container">
      <div className="row">
        {MenuItems.map((item, i) => {
          return (
            <div key={i} className="col-12 col-md-6">
              <a href={item.link}>
                <button style={{ width: "90%" }} className="main-buttons">
                  {item.label}
                </button>
              </a>
            </div>
          );
        })}
      </div>
    </div>
  );
}
