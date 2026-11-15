"use client";

import { toast } from "@/core/feedback";
import { Button } from "@/shared/ui/button";

export function ToastDemo() {
  return (
    <div className="flex flex-wrap gap-3">
      <Button
        variant="outline"
        onClick={() =>
          toast("Tarefa arquivada", { action: { label: "Desfazer", onClick: () => toast("Tarefa de volta.") } })
        }
      >
        Arquivar tarefa
      </Button>
      <Button variant="outline" onClick={() => toast.success("Proposta enviada para a Estúdio Nativa.")}>
        Sucesso
      </Button>
      <Button variant="outline" onClick={() => toast.error("Não deu para carregar as cobranças agora.")}>
        Erro
      </Button>
    </div>
  );
}
