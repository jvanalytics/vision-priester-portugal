import { useState } from "react";
import { Check, ChevronsUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { PPR_PRODUCTS, type PPRProduct } from "@/lib/ppr-products";

interface Props {
  value: string;
  onChange: (id: string) => void;
}

export function PPRProductSelect({ value, onChange }: Props) {
  const [open, setOpen] = useState(false);
  const selected: PPRProduct | undefined = PPR_PRODUCTS.find((p) => p.id === value);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between h-auto min-h-10 py-2 bg-secondary/40 border-border hover:bg-secondary/60 text-left font-normal"
        >
          <span className="flex flex-col items-start min-w-0">
            <span className="text-sm truncate max-w-[200px] text-foreground">
              {selected ? selected.name : "Select PPR fund..."}
            </span>
            {selected && (
              <span className="text-[10px] text-muted-foreground tabular-nums">
                Fee {(selected.fee * 100).toFixed(2)}%
              </span>
            )}
          </span>
          <ChevronsUpDown className="ml-2 h-3.5 w-3.5 shrink-0 opacity-60" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[320px] p-0 bg-popover border-border" align="start">
        <Command className="bg-popover">
          <CommandInput placeholder="Search funds..." className="h-9" />
          <CommandList>
            <CommandEmpty>No funds found.</CommandEmpty>
            <CommandGroup>
              {PPR_PRODUCTS.map((p) => (
                <CommandItem
                  key={p.id}
                  value={`${p.name} ${p.manager} ${p.isin}`}
                  onSelect={() => {
                    onChange(p.id);
                    setOpen(false);
                  }}
                  className="flex items-start gap-2 py-2"
                >
                  <Check
                    className={cn(
                      "mt-0.5 h-3.5 w-3.5 shrink-0",
                      value === p.id ? "opacity-100" : "opacity-0",
                    )}
                  />
                  <div className="flex-1 min-w-0">
                    <div className="text-sm truncate text-foreground">{p.name}</div>
                    <div className="text-[10px] text-muted-foreground tabular-nums">
                      {p.isin} · {(p.fee * 100).toFixed(2)}% fee
                    </div>
                  </div>
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
