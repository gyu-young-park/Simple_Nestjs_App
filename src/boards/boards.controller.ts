import { Body, Controller, Delete, Get, NotFoundException, Param, ParseIntPipe, Patch, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { identity } from 'rxjs';
import { BoardStatus } from './board-status.enum';
import { Board } from './board.entity';
import { BoardsService } from './boards.service';
import { CreateBoardDto } from './dto/create-board.dto';
import { BoardCreateValidationPipe } from './pipes/board-create-validation.pipe';
import { BoardStatusValidationPipe } from './pipes/board-status-validation.pipe';

@Controller('boards')
export class BoardsController {
    constructor(private boardsService : BoardsService){}

    @Get('/:id')
    getBoardById(@Param('id' , ParseIntPipe) id : number) : Promise<Board> {
        return this.boardsService.getBoardById(id)
    }

    @Get()
    getAllBoards() : Promise<Board[]> {
        return this.boardsService.getAllBoards()
    }

    @Post()
    @UsePipes(ValidationPipe)
    createBoard(@Body() createBoardDto : CreateBoardDto) : Promise<Board> {
        return this.boardsService.createBoard(createBoardDto)
    }

    @Delete('/:id')
    deleteBoard(@Param('id', ParseIntPipe) id : number) : Promise<void> {
        return this.boardsService.deleteBoard(id);
    }

    @Patch('/:id/status')
    updateBoardStatus(
        @Param('id', ParseIntPipe) id : number, 
        @Body('status', BoardStatusValidationPipe) status : BoardStatus
    ){
        return this.boardsService.updateBoardStatus(id, status)
    }
}
