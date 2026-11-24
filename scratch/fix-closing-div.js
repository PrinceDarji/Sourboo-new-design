const fs = require('fs');

const p = 'c:/Users/user/Downloads/Sourboo/repo/sourboo-final-main/app/about/page.tsx';
let c = fs.readFileSync(p, 'utf8').replace(/\r\n/g, '\n');

const target = `          </div>
        </div>
      </section>

      {/* =========================================================================
          ACT 5: INTRODUCING SOURBOO`;

const replacement = `          </div>
        </div>
        </div>
      </section>

      {/* =========================================================================
          ACT 5: INTRODUCING SOURBOO`;

c = c.replace(target, replacement);
fs.writeFileSync(p, c.replace(/\n/g, '\r\n'), 'utf8');
console.log('Fixed closing div in app/about/page.tsx');
