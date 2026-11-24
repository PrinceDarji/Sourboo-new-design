export const FRIDGE_SEEN_KEY = 'sourboo_fridge_seen_v1';
export const FRIDGE_REPLAY_AFTER_MS = 7 * 24 * 60 * 60 * 1000;

/**
 * Runs in <head> before first paint so the fridge overlay is either shown from
 * the very first frame or never shown at all (no flash for returning visitors).
 */
export const FRIDGE_DECISION_SCRIPT = `(function(){var d=document.documentElement;try{var p=location.pathname.replace(/\\/+$/,'')||'/';var play=p==='/'||p==='/home';if(play&&window.matchMedia&&window.matchMedia('(prefers-reduced-motion: reduce)').matches)play=false;var t=Number(localStorage.getItem('${FRIDGE_SEEN_KEY}'))||0;if(play&&Date.now()-t<${FRIDGE_REPLAY_AFTER_MS})play=false;d.setAttribute('data-fridge',play?'play':'skip');}catch(e){d.setAttribute('data-fridge','skip');}})();`;
