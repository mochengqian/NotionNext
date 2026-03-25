/* eslint-disable react/no-unknown-property */
/**
 * Theme-scoped styles
 */
const Style = () => {
  return (
    <style jsx global>{`
      :root {
        --heo-bg: #f3f5f8;
        --heo-surface: #ffffff;
        --heo-text: #0f172a;
        --heo-muted: #64748b;
        --heo-accent: #2563eb;
      }

      body {
        background-color: var(--heo-bg);
        color: var(--heo-text);
      }

      #theme-heo {
        background: var(--heo-bg);
      }

      #theme-heo .scroll-hidden::-webkit-scrollbar,
      #theme-heo .recent-top-post-group::-webkit-scrollbar {
        display: none;
      }

      #theme-heo .notion {
        color: var(--heo-text);
      }

      #theme-heo .notion a {
        color: var(--heo-accent);
      }

      #theme-heo .notion a:hover {
        opacity: 0.85;
      }

      #theme-heo ::-webkit-scrollbar-thumb {
        background: rgba(100, 116, 139, 0.4);
        border-radius: 8px;
      }

      #theme-heo ::-webkit-scrollbar {
        width: 8px;
        height: 8px;
      }

      #more {
        white-space: nowrap;
      }

      * {
        box-sizing: border-box;
      }
    `}</style>
  )
}

export { Style }
