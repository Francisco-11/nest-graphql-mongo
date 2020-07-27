import { Resolver,Query, Mutation, Args } from "@nestjs/graphql";
import { LessonType } from './lesson.type';
import { LessonService } from './lesson.service';
import { CreateLessonInput } from './lesson.input';


@Resolver(of => LessonType)
export class LessonResolver {

    // Esta se utiliza para recuperar datos, crear nuevos datos o cambiar datos existentes
    constructor(
        private lessonService: LessonService,
    ) {}
    @Query(returns => LessonType)
    lesson(
        @Args('id') id: string,

    ) {
        return this.lessonService.getLesson(id);
    }

    @Query(returns => [LessonType])
    lessons() {
        return this.lessonService.getLessons();
    }

    @Mutation(returns => LessonType )
    createLesson(@Args('createLessonInput') createLessonInput: CreateLessonInput) {
        return this.lessonService.createLesson(createLessonInput);
    }
}