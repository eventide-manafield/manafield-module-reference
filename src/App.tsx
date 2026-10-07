import { useEffect, useState } from "react";

import { fetchModules } from "./lib/core";
import type { ModuleDescriptor } from "./types/manafield";

type LoadState =
  | { status: "loading" }
  | { status: "ready"; modules: ModuleDescriptor[] }
  | { status: "error"; message: string };

export default function App() {
  const [state, setState] = useState<LoadState>({ status: "loading" });

  async function refresh() {
    setState({ status: "loading" });

    try {
      const modules = await fetchModules();
      setState({ status: "ready", modules });
    } catch (error) {
      setState({
        status: "error",
        message: error instanceof Error ? error.message : "Unknown error"
      });
    }
  }

  useEffect(() => {
    void refresh();
  }, []);

  return (
    <main className="shell">
      <header className="hero">
        <div>
          <p className="eyebrow">Manafield Module Reference</p>
          <h1>Registry Observer</h1>
          <p className="description">
            A reference Web Module that observes the Manafield Core registry.
          </p>
        </div>

        <button type="button" onClick={() => void refresh()}>
          Refresh
        </button>
      </header>

      {state.status === "loading" && (
        <section className="panel">
          <p>Reading Manafield Core...</p>
        </section>
      )}

      {state.status === "error" && (
        <section className="panel error">
          <strong>Core unavailable</strong>
          <p>{state.message}</p>
        </section>
      )}

      {state.status === "ready" && (
        <section className="module-grid">
          {state.modules.length === 0 ? (
            <article className="panel">
              <p>No Modules are currently registered.</p>
            </article>
          ) : (
            state.modules.map((module) => (
              <ModuleCard key={module.id} module={module} />
            ))
          )}
        </section>
      )}
    </main>
  );
}

function ModuleCard({ module }: { module: ModuleDescriptor }) {
  return (
    <article className="module-card">
      <div className="module-heading">
        <div>
          <h2>{module.name}</h2>
          <code>{module.id}</code>
        </div>
        <span className="version">v{module.version}</span>
      </div>

      {module.description && (
        <p className="module-description">{module.description}</p>
      )}

      <dl>
        <div>
          <dt>Operations</dt>
          <dd>{module.operations.length}</dd>
        </div>
        <div>
          <dt>Health</dt>
          <dd>{module.healthOperation ?? "Not declared"}</dd>
        </div>
      </dl>

      <div className="operations">
        {module.operations.map((operation) => (
          <div className="operation" key={operation.id}>
            <div>
              <strong>{operation.id}</strong>
              <span>
                {operation.binding.method} {operation.binding.path}
              </span>
            </div>
            <small>{operation.binding.codecs.join(" · ")}</small>
          </div>
        ))}
      </div>
    </article>
  );
}
