(function () {
  function escapeHtml(value) {
    return value
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }

  function highlightLine(line) {
    var html = escapeHtml(line);
    html = html.replace(/(^|\s)(#.*$|\/\/.*$)/, '$1<span class="token comment">$2</span>');
    html = html.replace(/(&quot;.*?&quot;|&#039;.*?&#039;)/g, '<span class="token string">$1</span>');
    html = html.replace(/\b(import|from|def|class|if|else|elif|for|while|return|print|function|var|let|const|sudo|apt-get|yum|dnf|systemctl|service|iptables|tcpdump|python|perl|bash|sh|nmap|grep|awk|sed|cat|cp|mv|chmod|chown|mkdir|rm|ssh|scp|curl|wget|git|docker|kubectl)\b/g, '<span class="token keyword">$1</span>');
    html = html.replace(/\b(0x[0-9a-fA-F]+|\d+(?:\.\d+)?)\b/g, '<span class="token number">$1</span>');
    return html;
  }

  function addCopyButton(pre, raw) {
    var button = document.createElement('button');
    button.className = 'copy-code-button';
    button.type = 'button';
    button.textContent = 'Copy';
    button.addEventListener('click', function () {
      navigator.clipboard.writeText(raw).then(function () {
        button.textContent = 'Copied';
        setTimeout(function () { button.textContent = 'Copy'; }, 1600);
      }).catch(function () {
        button.textContent = 'Select';
        setTimeout(function () { button.textContent = 'Copy'; }, 1600);
      });
    });
    pre.appendChild(button);
  }

  document.querySelectorAll('.content pre').forEach(function (pre) {
    var code = pre.querySelector('code');
    if (!code || pre.classList.contains('code-enhanced')) return;

    var raw = code.textContent.replace(/\n$/, '');
    var langClass = Array.from(code.classList).find(function (name) { return name.indexOf('language-') === 0; });
    var label = pre.getAttribute('data-language') || (langClass ? langClass.replace('language-', '') : 'code');

    pre.classList.add('code-enhanced');
    pre.setAttribute('data-language', label || 'code');
    code.innerHTML = raw.split('\n').map(function (line, index) {
      return '<span class="code-line"><span class="line-number">' + (index + 1) + '</span><span class="line-code">' + highlightLine(line) + '</span></span>';
    }).join('');
    addCopyButton(pre, raw);
  });
}());
