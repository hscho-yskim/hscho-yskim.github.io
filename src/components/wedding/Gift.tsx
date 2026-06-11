import React, {useCallback, useEffect, useRef, useState} from "react";
import {createPortal} from "react-dom";
import SectionHeading from "./SectionHeading";
import styles from "./Gift.module.css";

type Person = {
  role: string;
  name: string;
  phone?: string;
  bank?: string;
  accountNumber?: string;
};

type Side = {
  label: string;
  main: Person;
  parents: Person[];
};

const sides: Side[] = [
  {
    label: "신부측 연락처",
    main: {
      role: "신부",
      name: "조현수",
      phone: "010-5461-4626",
      bank: "국민은행",
      accountNumber: "378801-01-122436",
    },
    parents: [
      {role: "아버지", name: "조영상"},
      {role: "어머니", name: "김선희"},
    ],
  },
  {
    label: "신랑측 연락처",
    main: {
      role: "신랑",
      name: "김용성",
      phone: "010-7461-0520",
      bank: "토스뱅크",
      accountNumber: "1000-0007-3206",
    },
    parents: [
      {
        role: "어머니",
        name: "신금채",
        phone: "010-2727-2221",
        bank: "우리은행",
        accountNumber: "161-07-002228",
      },
    ],
  },
];

function PhoneIcon(): JSX.Element {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.79 19.79 0 0 1 2.12 4.18 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.37 1.9.72 2.8a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.28-1.28a2 2 0 0 1 2.11-.45c.9.35 1.84.59 2.8.72A2 2 0 0 1 22 16.92Z"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function CopyIcon(): JSX.Element {
  return (
    <svg
      width="12"
      height="12"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <rect x="9" y="9" width="13" height="13" rx="2" stroke="currentColor" strokeWidth="1.6" />
      <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" stroke="currentColor" strokeWidth="1.6" />
    </svg>
  );
}

function MessageIcon(): JSX.Element {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2Z"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ChevronIcon(): JSX.Element {
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M6 9l6 6 6-6"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

async function writeClipboard(value: string): Promise<boolean> {
  if (typeof navigator === "undefined") return false;
  if (navigator.clipboard?.writeText) {
    try {
      await navigator.clipboard.writeText(value);
      return true;
    } catch {
      // fall through to legacy path
    }
  }
  if (typeof document === "undefined") return false;
  const ta = document.createElement("textarea");
  ta.value = value;
  ta.style.position = "fixed";
  ta.style.opacity = "0";
  document.body.appendChild(ta);
  ta.select();
  try {
    return document.execCommand("copy");
  } catch {
    return false;
  } finally {
    document.body.removeChild(ta);
  }
}

function shortBank(bank: string): string {
  return bank.replace(/은행$/, "");
}

function maskAccount(num: string): string {
  const groups = num.split("-");
  if (groups.length < 2) return num;
  const tail = groups[groups.length - 1];
  const last2 = tail.slice(-2);
  return `${groups.slice(0, -1).join("-")}...${last2}`;
}

type PersonRowProps = {
  person: Person;
  onCopy: (bank: string, accountNumber: string, name: string) => void;
  variant?: "main" | "parent";
};

function PersonRow({
  person,
  onCopy,
  variant = "main",
}: PersonRowProps): JSX.Element {
  const tel = person.phone ? person.phone.replace(/-/g, "") : "";
  const hasAccount = Boolean(person.bank && person.accountNumber);
  const isParent = variant === "parent";

  return (
    <div className={`${styles.personRow} ${isParent ? styles.parentRow : ""}`}>
      <div className={styles.personHead}>
        <div className={styles.personInfo}>
          <span className={styles.personRole}>{person.role}</span>
          <span className={styles.personName}>{person.name}</span>
        </div>
        {person.phone && (
          <div className={styles.personActions}>
            <a
              className={styles.iconBtn}
              href={`tel:${tel}`}
              aria-label={`${person.role} ${person.name} 전화`}
            >
              <PhoneIcon />
            </a>
            <a
              className={styles.iconBtn}
              href={`sms:${tel}`}
              aria-label={`${person.role} ${person.name} 메시지`}
            >
              <MessageIcon />
            </a>
          </div>
        )}
      </div>
      {hasAccount && (
        <div className={styles.account}>
          <span className={styles.bank}>{person.bank}</span>
          <span className={styles.number}>{person.accountNumber}</span>
          <button
            type="button"
            className={styles.copyBtn}
            onClick={() =>
              onCopy(person.bank!, person.accountNumber!, person.name)
            }
          >
            복사
          </button>
        </div>
      )}
    </div>
  );
}

export default function Gift(): JSX.Element {
  const [toast, setToast] = useState<string | null>(null);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleCopy = useCallback(
    async (bank: string, accountNumber: string, name: string) => {
      const ok = await writeClipboard(`${bank} ${accountNumber} ${name}`);
      if (ok) {
        setToast(`${shortBank(bank)} ${maskAccount(accountNumber)} 복사됨`);
      } else {
        setToast("복사하지 못했어요");
      }
      if (timer.current) clearTimeout(timer.current);
      timer.current = setTimeout(() => setToast(null), 1800);
    },
    [],
  );

  useEffect(() => {
    return () => {
      if (timer.current) clearTimeout(timer.current);
    };
  }, []);

  const foldoutOrder = sides;

  return (
    <section className={styles.gift}>
      <SectionHeading title="마음 전하기" />

      <p className={styles.note}>
        함께하지 못하시더라도
        <br />
        따뜻한 축하의 연락만으로도
        <br />
        저희에게는 큰 기쁨이 됩니다.
        <br />
        전해주시는 마음 감사히 간직하겠습니다.
      </p>

      <div className={styles.foldouts}>
        {foldoutOrder.map((side) => {
          return (
            <details key={side.label} className={styles.foldout}>
              <summary className={styles.foldoutSummary}>
                <span className={styles.summaryLabel}>{side.label}</span>
                <ChevronIcon />
              </summary>
              <div className={styles.foldoutBody}>
                <PersonRow person={side.main} onCopy={handleCopy} />
                {side.parents.map((parent) => (
                  <PersonRow
                    key={parent.name}
                    person={parent}
                    onCopy={handleCopy}
                    variant="parent"
                  />
                ))}
              </div>
            </details>
          );
        })}
      </div>

      {toast &&
        createPortal(
          <div className={styles.toast} role="status" aria-live="polite">
            {toast}
          </div>,
          document.body,
        )}
    </section>
  );
}
