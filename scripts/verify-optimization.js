const content = `
<div class="separator" style="clear: both; text-align: center;"><a href="https://1.bp.blogspot.com/-abc/s1600/img1.jpg" imageanchor="1" style="margin-left: 1em; margin-right: 1em;"><img border="0" data-original-height="1200" data-original-width="1600" height="480" src="https://1.bp.blogspot.com/-abc/s1600/img1.jpg" width="640" /></a></div>
<p>Some text with another <img src="https://blogger.googleusercontent.com/img/b/xyz/s1600/img2.png" alt="test" /> image.</p>
<div class="separator" style="clear: both; text-align: center;"><a href="https://2.bp.blogspot.com/-def/s1600/img3.jpg" imageanchor="1" style="margin-left: 1em; margin-right: 1em;"><img border="0" src="https://2.bp.blogspot.com/-def/s1600/img3.jpg" /></a></div>
`.repeat(10); // 30 images total

function original(content) {
  return content.match(/<img.*?src=".*?"/g)?.map((img) => {
    const url =
      img
        .match(/src=".*?"/)?.[0]
        .replace('src="', '')
        .replace('"', '') ?? '';
    return {
      url: url,
    };
  }) ?? [];
}

const IMG_SRC_REGEX = /<img[^>]+src="([^">]+)"/g;
function optimized(content) {
  return Array.from(content.matchAll(IMG_SRC_REGEX), (match) => ({
    url: match[1],
  }));
}

// Test correctness
const res1 = original(content);
const res2 = optimized(content);
const equal = JSON.stringify(res1) === JSON.stringify(res2);
console.log('Functional Parity:', equal ? 'PASSED' : 'FAILED');

if (!equal) {
    console.log('Sample Original:', res1[0]);
    console.log('Sample Optimized:', res2[0]);
    process.exit(1);
}

const iterations = 50000;

console.log(`Running benchmark with ${iterations} iterations...`);

const startOriginal = process.hrtime.bigint();
for (let i = 0; i < iterations; i++) {
  original(content);
}
const endOriginal = process.hrtime.bigint();
const timeOriginal = Number(endOriginal - startOriginal) / 1e6;

const startOptimized = process.hrtime.bigint();
for (let i = 0; i < iterations; i++) {
  optimized(content);
}
const endOptimized = process.hrtime.bigint();
const timeOptimized = Number(endOptimized - startOptimized) / 1e6;

console.log(`Original: ${timeOriginal.toFixed(2)}ms`);
console.log(`Optimized: ${timeOptimized.toFixed(2)}ms`);
console.log(`Improvement: ${(((timeOriginal - timeOptimized) / timeOriginal) * 100).toFixed(2)}%`);
