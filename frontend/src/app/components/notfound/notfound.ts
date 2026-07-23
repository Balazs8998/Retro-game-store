import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
  inject,
  signal,
} from '@angular/core';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-not-found',
  imports: [RouterLink],
  templateUrl: './notfound.html',
  styleUrl: './notfound.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NotFound implements OnInit, OnDestroy {
  @ViewChild('scene', { static: true })
   scene!: ElementRef<HTMLElement>;

   readonly document = inject(Document);

   readonly currentYear = new Date().getFullYear();
   readonly isGlitching = signal(false);

   animationFrameId?: number;
   glitchIntervalId?: ReturnType<typeof setInterval>;

  ngOnInit(): void {
    this.startBackgroundAnimation();
    this.startRandomGlitch();
  }

  ngOnDestroy(): void {
    if (this.animationFrameId !== undefined) {
      cancelAnimationFrame(this.animationFrameId);
    }

    if (this.glitchIntervalId !== undefined) {
      clearInterval(this.glitchIntervalId);
    }
  }

   activateGlitch(): void {
    if (this.isGlitching()) {
      return;
    }

    this.isGlitching.set(true);

    setTimeout(() => {
      this.isGlitching.set(false);
    }, 650);
  }

   handlePointerMove(event: PointerEvent): void {
    const element = this.scene.nativeElement;
    const rect = element.getBoundingClientRect();

    const normalizedX = (event.clientX - rect.left) / rect.width - 0.5;
    const normalizedY = (event.clientY - rect.top) / rect.height - 0.5;

    element.style.setProperty('--pointer-x', normalizedX.toString());
    element.style.setProperty('--pointer-y', normalizedY.toString());
  }

   resetPointer(): void {
    const element = this.scene.nativeElement;

    element.style.setProperty('--pointer-x', '0');
    element.style.setProperty('--pointer-y', '0');
  }

   startRandomGlitch(): void {
    this.glitchIntervalId = setInterval(() => {
      this.activateGlitch();
    }, 5500);
  }

   startBackgroundAnimation(): void {
    let position = 0;

    const animate = (): void => {
      position = (position + 0.08) % 1000;

      this.scene.nativeElement.style.setProperty(
        '--grid-position',
        `${position}px`,
      );

      this.animationFrameId = requestAnimationFrame(animate);
    };

    this.animationFrameId = requestAnimationFrame(animate);
  }
}
