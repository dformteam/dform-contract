import { base58, Context, u128, util, logging } from "near-sdk-core";
import { FormStorage, UserFormStorage } from "../storage/form.storage";
import { PublishFormStorage } from "../storage/publish_form.storage";
import { UserAnswer } from "./answer.model";
import Answer from "./answer.model";
import PublishForm from "./publish_form.model";
import Question from "./question.model";
import { QuestionType } from "./question.model";

export enum FORM_STATUS {
    EDITING,
    STARTING,
    ENDED,
}

@nearBindgen
class Form {
    public id: string;
    private owner: string;
    private status: FORM_STATUS;
    private limit_participants: u32;
    private enroll_fee: u128;
    private start_date: u64;
    private end_date: u64;
    private questions: Map<string, Question>;
    private answers: Map<string, Map<string, Answer>>; // user => [qId => [, answer]
    private isRetry: bool = false;

    constructor(private title: string, private description: string) {
        this.owner = Context.sender;
        this.status = FORM_STATUS.EDITING;
        if (this.questions == null) {
            this.questions = new Map();
        }

        if (this.answers == null) {
            this.answers = new Map();
        }

        this.generate_id();
    }

    private generate_id(): void {
        let formId: string = "";
        while (formId == "") {
            const blockTime = Context.sender + Context.blockTimestamp.toString();
            const hBlockTime = base58.encode(util.stringToBytes(blockTime));
            if (!FormStorage.contains(hBlockTime)) {
                formId = hBlockTime;
            }
        }
        this.id = formId;
    }

    public get_id(): string {
        return this.id;
    }

    public get_max_question(): i32 {
        return this.questions.keys.length;
    }

    public get_owner(): string {
        return this.owner;
    }

    public get_limit_participant(): u32 {
        return this.limit_participants;
    }

    public get_enroll_fee(): u128 {
        return this.enroll_fee;
    }

    public get_start_date(): u64 {
        return this.start_date;
    }

    public get_end_date(): u64 {
        return this.end_date;
    }

    public get_is_retry(): bool {
        return this.isRetry;
    }

    get_title(): string {
        return this.title;
    }

    set_title(newTitle: string): void {
        if (newTitle != "" && this.title != newTitle) {
            this.title = newTitle;
        }
    }

    set_description(newDescription: string): void {
        if (newDescription !== "" && this.description !== newDescription) {
            this.description = this.description;
        }
    }

    set_retry(value: bool): void {
        if (this.isRetry != value) {
            this.isRetry = value;
        }
    }

    get_next_question(userId: string): Question | null {
        if (this.answers.has(userId)) {
            const anws = this.answers.get(userId);
            const qAnsweredId = anws.keys();
            const questionIds = this.questions.keys();
            const questionIds_lenth = questionIds.length;
            if (questionIds_lenth == qAnsweredId.length) {
                return null;
            }
            for (let i = 0; i < questionIds_lenth; i++) {
                if (!qAnsweredId.includes(questionIds[i])) {
                    return this.questions.get(questionIds[i]);
                }
            }
            return null;
        } else if (this.questions.size > 0) {
            return this.questions.values()[0];
        } else {
            return null;
        }
    }

    set_question_title(question_id: string, new_title: string): void {
        const question = this.questions.get(question_id);
        if (question == null) {
            return;
        }
        question.set_title(new_title);
    }

    set_question_meta(question_id: string, new_meta: string): void {
        const question = this.questions.get(question_id);
        if (question == null) {
            return;
        }
        question.set_meta(new_meta);
    }

    save(): void {
        FormStorage.set(this.id, this);
        UserFormStorage.set(this.owner, this.id);
    }

    remove(): void {
        FormStorage.delete(this.id);
        UserFormStorage.delete(this.owner, this.id);
    }

    add_new_question(type: QuestionType, title: string, meta: string, isRequired: bool): Question | null {
        const sender = Context.sender;
        if (this.owner == sender && this.status == FORM_STATUS.EDITING) {
            const newQuest = new Question(type, title, meta, this.id, isRequired);
            this.questions.set(newQuest.get_id(), newQuest);
            this.save();
            return newQuest;
        }
        return null;
    }

    remove_question(id: string): bool {
        const currentTimestamp = Context.blockTimestamp;
        if (this.status != FORM_STATUS.EDITING || currentTimestamp > this.start_date) {
            return false;
        }

        if (this.questions.has(id)) {
            this.questions.delete(id);
            this.save();
            return true;
        }

        return false;
    }

    unpublish(): bool {
        const currentTimestamp = Context.blockTimestamp;
        if (this.status != FORM_STATUS.EDITING && currentTimestamp > this.end_date) {
            this.status = FORM_STATUS.EDITING;
            this.start_date = 0;
            this.end_date = 0;
            this.enroll_fee = u128.Zero;
            this.limit_participants = 0;
            this.answers = new Map();
            this.save();
            PublishFormStorage.delete(this.owner, this.id);
            return true;
        }
        return false;
    }

    submit_answer(userId: string, questionId: string, answers: string): bool {
        const current_timestamp = Context.blockTimestamp;
        if (this.answers.has(userId)) {
            const anws = this.answers.get(userId);
            const existedAnw = anws.has(questionId);
            if (this.isRetry || !existedAnw) {
                const newAnswer = new Answer(this.id, questionId, answers);
                anws.set(questionId, newAnswer);
                this.save();
                return true;
            } else {
                return false;
            }
        } else {
            const newAnswer = new Answer(this.id, questionId, answers);
            this.answers.set(userId, new Map<string, Answer>().set(questionId, newAnswer));
            this.save();
            return true;
        }
    }

    toString(): string {
        return `{id: ${this.id}, owner: ${this.owner}, question: ${this.questions.values()}}`;
    }

    publish(limit_participants: u32, enroll_fee: u128, start_date: u64, end_date: u64): PublishForm {
        const publishForm = new PublishForm(this.id, limit_participants, enroll_fee, start_date, end_date);
        publishForm.save();
        return publishForm;
    }

    get_answer(userId: string): UserAnswer[] {
        if (this.answers.has(userId)) {
            const mAnws = this.answers.get(userId);
            const nAnws_key = mAnws.keys();
            const nAnsws_key_length = nAnws_key.length;
            const result = new Set<UserAnswer>();
            for (let i = 0; i < nAnsws_key_length; i++) {
                const question_id = nAnws_key[i];
                const question = this.questions.get(question_id);
                if (question != null) {
                    const anw = mAnws.get(nAnws_key[i]);
                    const question_title = question.get_title();
                    const question_type = question.get_type();
                    const answer_meta = anw.get_answer();
                    const answer_submit_time = anw.get_submit_time();
                    result.add(new UserAnswer(question_id, question_title, question_type, answer_meta, answer_submit_time));
                }
            }

            return result.values();
        }

        return new Array<UserAnswer>(0);
    }

    get_questions(): Question[] {
        return this.questions.values();
    }

    get_question(question_id: string): Question {
        return this.questions.get(question_id);
    }

    publicAsATemplate(): void {}
}

export default Form;
