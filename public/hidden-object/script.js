/**
 * Hidden Object Standalone Entry Script
 */
document.addEventListener('DOMContentLoaded', () => {
  const game = new window.HiddenObjectGame({
    container: document.getElementById('hidden-object-app'),
    sessionIndex: 0,
    onLevelComplete: (bgNumber) => {
      console.log(`Background ${bgNumber} completed!`);
    },
    onSessionComplete: (sessionIdx) => {
      console.log(`Session ${sessionIdx} completed!`);
      alert('Tahniah! Sesi Hidden Object berjaya diselesaikan!');
    },
    onWrongAnswer: () => {
      console.log('Jawapan salah!');
    }
  });

  game.init();
});
