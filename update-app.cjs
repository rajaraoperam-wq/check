const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'src', 'App.jsx');
let content = fs.readFileSync(filePath, 'utf8');

const oldCode = `                  <button className="btn yes" onClick={acceptValentine}>
                    Yes 💖
                  </button>

                  <button
                    className="btn no"`;

const newCode = `                  <button className="btn yes" onClick={acceptValentine}>
                    Yes 💖
                  </button>

                  {heartExplosion.map((heart) => {
                    const x = Math.cos(heart.angle) * heart.distance;
                    const y = Math.sin(heart.angle) * heart.distance;
                    return (
                      <div
                        key={heart.id}
                        className="exploding-heart"
                        style={{
                          "--tx": \`\${x}px\`,
                          "--ty": \`\${y}px\`,
                          "--delay": \`\${heart.id * 0.05}s\`,
                        }}
                      >
                        💖
                      </div>
                    );
                  })}

                  <button
                    className="btn no"`;

content = content.replace(oldCode, newCode);
fs.writeFileSync(filePath, content, 'utf8');
console.log('Heart explosion feature added successfully!');
