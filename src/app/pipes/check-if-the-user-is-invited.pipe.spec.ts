import { CheckIfTheUserIsInvitedPipe } from './check-if-the-user-is-invited.pipe';

describe('CheckIfTheUserIsInvitedPipe', () => {
  it('create an instance', () => {
    const pipe = new CheckIfTheUserIsInvitedPipe();
    expect(pipe).toBeTruthy();
  });
});
