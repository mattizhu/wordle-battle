import React, {Component} from 'react';

export default class GameBoard extends Component {
    constructor(props) {
        super(props);
    }

    // Tile Generation
    generateTiles() {
        return this.props.gameTiles.map((tileRow, rowIndex) => <div key={"row-" + rowIndex} className={`row ${tileRow.locked ? 'active':''} grid grid-cols-5 gap-1.5`}>{tileRow.row.map((tile, tileIndex) => <div key={"tile-" + rowIndex + "/" + tileIndex} className="inline-flex w-full justify-center items-center text-3xl font-bold border-2 border-gray-700 text-center uppercase rounded-lg before:content-none before:inline-block before:pb-[100%] animate__animated">{tile}</div>)}</div>);
    }

    render() {
        return (
            <div id="game-tileboard" className="flex flex-auto items-center mx-auto py-12">
                <div id="board" className="grid grid-rows-6 gap-1.5 w-[500px] h-xl">{this.generateTiles()}</div>
            </div>
        );
    }
}
