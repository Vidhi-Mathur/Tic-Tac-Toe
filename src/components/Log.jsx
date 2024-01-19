export default function Log(props){  
    //In Log, have to manage some dynamic array of turns here, which grows with every button click. But it can't be managed here as info. which button is clicked is generated in game board. So, have to lift state up again in App component, having access to both GameBoard and Log component
    return (
        <>
        <ol id="log">
            {/* Key always required while outputting a dynamic list */}
            {props.turns.map(turn => <li key={`${turn.sq.row}${turn.sq.col}`}>{turn.player} selected {turn.sq.row}, {turn.sq.col}</li>)}
        </ol>
        </>
    )
}