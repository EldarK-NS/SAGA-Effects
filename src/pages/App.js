import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
function App() {
  const store = useSelector((store) => store);
  console.log(store);
  return (
    <div className='App'>
      Saga-Course
      <div>
        <Link to={"/blog"}>open blog</Link>
      </div>
    </div>
  );
}

export default App;
