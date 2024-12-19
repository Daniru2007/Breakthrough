import Leaderboards from './components/Leaderboard/components/Leaderboards';
import "./Leaderboard.css"

function Leaderboard() {
  return (
    <div className="min-h-screen min-w-full " style={{display:"flex", justifyContent:"center", alignItems:"center"}}>
      <Leaderboards />
    </div>
  );
}

export default Leaderboard;