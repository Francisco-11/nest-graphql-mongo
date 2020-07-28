import { Resolver,Query, Mutation, Args, Parent,ResolveField } from "@nestjs/graphql";
import { LessonType } from './lesson.type';
import { LessonService } from './lesson.service';
import { CreateLessonInput } from './lesson.input';
import { AssignStudentsToLessonInput } from './assign-students-to-lesson.input';
import { Lesson } from './lesson.entity';
import { StudentService } from '../student/student.service';


@Resolver(of => LessonType)
export class LessonResolver {

    // Esta se utiliza para recuperar datos, crear nuevos datos o cambiar datos existentes
    constructor(
        private lessonService: LessonService,
        private studentService: StudentService
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

    @Mutation(returns => LessonType)
    assignStudentsToLesson(@Args('assignStudentsToLesson') assignStudentsToLessonInput:AssignStudentsToLessonInput) {
        const { lessonId, studentIds } = assignStudentsToLessonInput;
        return this.lessonService.assignStudentsToLesson(lessonId, studentIds);
    }

    @ResolveField()
    async students(@Parent() lesson: Lesson) {
        return this.studentService.getManyStudents(lesson.students);
        
    }
}