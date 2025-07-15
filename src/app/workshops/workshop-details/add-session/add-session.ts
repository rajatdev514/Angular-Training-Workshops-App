import { Component } from '@angular/core';
import { RouterLink, ActivatedRoute, Router } from '@angular/router';
import {
  ReactiveFormsModule,
  NgForm,
  FormGroup,
  FormControl,
  Validators,
  FormBuilder,
  AbstractControl,
} from '@angular/forms';
import { JsonPipe } from '@angular/common';
import { SessionsService } from '../../sessions';
import ISession from '../../models/ISession';
import { ToastService } from '../../../common/toast';

function durationAndLevel(form: AbstractControl) {
  const durationStr = (form.get('duration') as AbstractControl).value;
  const duration = +durationStr;
  const level = (form.get('level') as AbstractControl).value;

  // if valid -> return null
  // if invalid -> return an object with the details of the error. Further this object should have the property called `durationAndLevel`
  if (durationStr === '' || level === '') {
    return null;
  }

  if (level === 'Basic') {
    return null;
  }

  if (level === 'Intermediate') {
    if (duration >= 2) {
      return null;
    }

    // error
    return {
      durationAndLevel:
        'Intermediate level session should be at least 2 hours in duration',
    };
  }

  if (level === 'Advanced') {
    if (duration >= 3) {
      return null;
    }

    // error
    return {
      durationAndLevel:
        'Advanced level session should be at least 3 hours in duration',
    };
  }

  return null;
}

@Component({
  selector: 'app-add-session',
  standalone: true,
  imports: [RouterLink, JsonPipe, ReactiveFormsModule],
  templateUrl: './add-session.html',
  styleUrls: ['./add-session.scss'],
})
export class AddSession {
  addSessionForm!: FormGroup;
  // helper accessor methods
  get sequenceId() {
    return this.addSessionForm.get('sequenceId') as FormControl;
  }

  get name() {
    return this.addSessionForm.get('name') as FormControl;
  }

  get speaker() {
    return this.addSessionForm.get('speaker') as FormControl;
  }

  get duration() {
    return this.addSessionForm.get('duration') as FormControl;
  }

  get level() {
    return this.addSessionForm.get('level') as FormControl;
  }

  get abstract() {
    return this.addSessionForm.get('abstract') as FormControl;
  }

  constructor(
    private activatedRoute: ActivatedRoute,
    private sessionsService: SessionsService,
    private router: Router,
    private toastService: ToastService,
    private fb: FormBuilder
  ) {
    this.addSessionForm = this.fb.group(
      {
        sequenceId: new FormControl(
          '', // initial value of the input
          [
            // the list of validators
            Validators.required,
            Validators.pattern('\\d+'),
          ]
        ),
        name: new FormControl('', [
          Validators.required,
          Validators.pattern('[A-Z][A-Za-z ]+'),
        ]),
        speaker: new FormControl('', [
          Validators.required,
          Validators.pattern('[A-Z][A-Za-z ]+(,[A-Z ][A-Za-z ]+)*'),
        ]),
        duration: new FormControl('', [
          Validators.required,
          Validators.min(0.5),
          Validators.max(10),
        ]),
        level: new FormControl('', [Validators.required]),
        abstract: new FormControl('', [
          Validators.required,
          Validators.minLength(20),
        ]),
      },
      {
        validators: durationAndLevel,
      }
    );
  }

  addSession() {
    const addSessionForm = this.addSessionForm;
    const id = +(this.activatedRoute.snapshot.parent?.paramMap.get(
      'id'
    ) as string);

    const newSession = {
      ...addSessionForm.value,
      workshopId: id,
      upvoteCount: 0,
      sequenceId: +(addSessionForm.value.sequenceId ?? 0),
      duration: +(addSessionForm.value.duration ?? 0),
    } as Omit<ISession, 'id'>;

    console.log(newSession);

    this.sessionsService.addSession(newSession).subscribe({
      next: (addedSession) => {
        this.toastService.add({
          message: `Added session with id = ${addedSession.id}`,
          className: 'bg-success text-light',
          duration: 5000,
        });

        // You can also use navigateByUrl()
        this.router.navigate(['/workshops', id]);
      },
      error: (error) => {
        this.toastService.add({
          message: `Unable to add the session - ${error.message}`,
          className: 'bg-danger text-light',
          duration: 5000,
        });
      },
    });
  }
}
