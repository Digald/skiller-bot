import React from "react";
import { useSelector } from "react-redux";
import LinearProgress from "@material-ui/core/LinearProgress";
import { lighten, makeStyles, withStyles } from "@material-ui/core/styles";
import styled from "styled-components";

// --------------------------------------------------------------------------STYLES
const StatsBar = withStyles({
  root: {
    height: 10,
    width: "100%",
    background: "grey"
  },
  bar: {
    borderRadius: 20,
    background: "#a8ff78",
    background: "-webkit-linear-gradient(to bottom, #78ffd6, #a8ff78)",
    background: "linear-gradient(to bottom, #78ffd6, #a8ff78)"
  }
})(LinearProgress);

const Stats = styled.div`
  border-radius: 0px 0px 25px 25px;
  padding: 20px;
  background: white;
  .statsTitle {
    text-align: center;
    padding: 0;
    font-weight: bold;
  }
  .stat-grid {
    display: grid;
    grid-template-columns: 1fr 2fr 1fr;
    grid-template-rows: auto;
    justify-items: center;
    align-items: center;
    span {
      font-size: 12px;
      color: rgba(0, 0, 0, 0.5);
    }
  }
`;
// ----------------------------------------------------------------------------HOOK
const useStatSummary = () => {
  const pokemon = useSelector(state => state.singlePoke);
  return { pokemon };
};
// -----------------------------------------------------------------------Component
export default function StatSummary() {
  const { pokemon } = useStatSummary();
  const { hp, atk, spatk, def, spdef, speed } = pokemon;
  const maxVal = Math.max(hp, atk, spatk, def, spdef, speed) / 0.9;
  const normalise = value => ((value - 0) * 100) / (maxVal - 0);
  // ------------------------------------------------------------------------RENDER
  return (
    <Stats>
      <p className="statsTitle">Stats</p>
      <div className="stat-grid">
        <span>HP</span>
        <StatsBar
          variant="determinate"
          color="secondary"
          value={normalise(hp)}
        />
        <span>{hp}</span>
        <span>ATTACK</span>
        <StatsBar
          variant="determinate"
          color="secondary"
          value={normalise(atk)}
        />
        <span>{atk}</span>
        <span>SP. ATK.</span>
        <StatsBar
          variant="determinate"
          color="secondary"
          value={normalise(spatk)}
        />
        <span>{spatk}</span>
        <span>DEFENCE</span>
        <StatsBar
          variant="determinate"
          color="secondary"
          value={normalise(def)}
        />
        <span>{def}</span>
        <span>SP. DEF.</span>
        <StatsBar
          variant="determinate"
          color="secondary"
          value={normalise(spdef)}
        />
        <span>{spdef}</span>
        <span>SPEED</span>
        <StatsBar
          variant="determinate"
          color="secondary"
          value={normalise(speed)}
        />
        <span>{speed}</span>
      </div>
    </Stats>
  );
}
