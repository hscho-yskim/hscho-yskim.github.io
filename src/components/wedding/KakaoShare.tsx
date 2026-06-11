import React, {useEffect, useState} from 'react';
import Head from '@docusaurus/Head';
import styles from './KakaoShare.module.css';

const KAKAO_JS_KEY = '0bfb3b149585d82530865ae233ec60bf';

declare global {
  interface Window {
    Kakao?: {
      init: (key: string) => void;
      isInitialized: () => boolean;
      Share: {
        sendDefault: (params: {
          objectType: string;
          content: {
            title: string;
            description: string;
            imageUrl: string;
            link: {mobileWebUrl: string; webUrl: string};
          };
          buttons: Array<{
            title: string;
            link: {mobileWebUrl: string; webUrl: string};
          }>;
        }) => void;
      };
    };
  }
}

export default function KakaoShare(): JSX.Element | null {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const win = window as typeof window & {Kakao?: unknown};

    function init() {
      if (win.Kakao && !(win.Kakao as Window['Kakao'])!.isInitialized()) {
        (win.Kakao as Window['Kakao'])!.init(KAKAO_JS_KEY);
      }
      setReady(true);
    }

    // SDK already loaded (clientModules run after <head> scripts)
    if (win.Kakao) {
      init();
      return;
    }

    // Wait for the script tag injected by <Head> to load
    const script = document.querySelector(
      'script[src*="kakao.min.js"]',
    ) as HTMLScriptElement | null;
    if (script) {
      script.addEventListener('load', init);
      return () => script.removeEventListener('load', init);
    }
  }, []);

  const handleShare = () => {
    window.Kakao?.Share.sendDefault({
      objectType: 'feed',
      content: {
        title: '조현수 · 김용성 청첩장',
        description: '2026년 9월 12일 토요일 오후 5시 · 더채플앳청담',
        imageUrl: 'https://hscho-yskim.github.io/img/wedding/cover.jpg',
        link: {
          mobileWebUrl: 'https://hscho-yskim.github.io/',
          webUrl: 'https://hscho-yskim.github.io/',
        },
      },
      buttons: [
        {
          title: '청첩장 보기',
          link: {
            mobileWebUrl: 'https://hscho-yskim.github.io/',
            webUrl: 'https://hscho-yskim.github.io/',
          },
        },
      ],
    });
  };

  return (
    <>
      <Head>
        <script
          src="https://t1.kakaocdn.net/kakao_js_sdk/2.7.2/kakao.min.js"
          async
        />
      </Head>
      <button
        className={styles.button}
        onClick={handleShare}
        disabled={!ready}
        aria-label="카카오톡으로 공유하기"
        type="button"
      >
        <svg
          className={styles.icon}
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M12 3C6.48 3 2 6.58 2 11.03c0 2.76 1.84 5.2 4.64 6.62l-1.18 4.35 5.04-2.64c.49.05.99.08 1.5.08 5.52 0 10-3.58 10-8S17.52 3 12 3z"
            fill="#3C1E1E"
          />
        </svg>
      </button>
    </>
  );
}
