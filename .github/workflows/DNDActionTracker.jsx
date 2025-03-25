import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const actions = [
  { name: "Attack", attacks: 3, options: ["Nyxian Greataxe", "Nyxian Knuckle Dusters", "Unarmed Strike"] },
  { name: "Dodge" },
  { name: "Dash" },
  { name: "Disengage" },
  { name: "Help" },
  { name: "Ready" },
  { name: "Use Object" },
  { name: "Bait and Switch" },
  { name: "Trip Attack" },
  { name: "Goading Attack" },
  { name: "Riposte" },
  { name: "Precision Attack" },
  { name: "Pushing Attack" },
  { name: "Disarming Attack" },
];

const bonusActions = [
  "Rage",
  "Second Wind",
  "Tunnel Fighter Stance",
  "Boots of Speed Activation",
  "Polearm Master Bonus Attack",
  "Shove with Shield"
];

const reactions = ["Opportunity Attack", "Riposte", "Brace", "Giant’s Havoc"];

export default function DnDActionTracker() {
  const [screen, setScreen] = useState("actions");
  const [rageActive, setRageActive] = useState(false);
  const [tunnelFighterActive, setTunnelFighterActive] = useState(false);
  const [bootsActive, setBootsActive] = useState(false);

  return (
    <div className="p-4 space-y-4">
      <div className="flex space-x-2">
        {rageActive && <span className="px-2 py-1 bg-red-500 text-white rounded">Rage Active (+3 Damage)</span>}
        {tunnelFighterActive && <span className="px-2 py-1 bg-blue-500 text-white rounded">Tunnel Fighter Active</span>}
        {bootsActive && <span className="px-2 py-1 bg-green-500 text-white rounded">Boots of Speed Active</span>}
      </div>
      {screen === "actions" && (
        <Card>
          <CardContent>
            <h2 className="text-xl font-bold">Actions</h2>
            {actions.map((action, index) => (
              <div key={index} className="p-2 border-b">
                <p className="font-semibold">{action.name}</p>
                {action.attacks && <p>Attacks: {action.attacks}</p>}
                {action.options && (
                  <p>Options: {action.options.join(", ")}{rageActive && " (+3 Damage)"}</p>
                )}
              </div>
            ))}
            <Button onClick={() => setScreen("bonus")}>Bonus Actions</Button>
          </CardContent>
        </Card>
      )}

      {screen === "bonus" && (
        <Card>
          <CardContent>
            <h2 className="text-xl font-bold">Bonus Actions</h2>
            {bonusActions.map((bonus, index) => (
              <div key={index} className="p-2 border-b">
                <p>{bonus}</p>
                {bonus === "Rage" && (
                  <Button onClick={() => setRageActive(!rageActive)}>
                    {rageActive ? "End Rage" : "Activate Rage"}
                  </Button>
                )}
                {bonus === "Tunnel Fighter Stance" && (
                  <Button onClick={() => setTunnelFighterActive(!tunnelFighterActive)}>
                    {tunnelFighterActive ? "Exit Stance" : "Enter Stance"}
                  </Button>
                )}
                {bonus === "Boots of Speed Activation" && (
                  <Button onClick={() => setBootsActive(!bootsActive)}>
                    {bootsActive ? "Deactivate Boots" : "Activate Boots"}
                  </Button>
                )}
              </div>
            ))}
            <Button onClick={() => setScreen("reaction")}>Reactions</Button>
          </CardContent>
        </Card>
      )}

      {screen === "reaction" && (
        <Card>
          <CardContent>
            <h2 className="text-xl font-bold">Reactions</h2>
            {reactions.map((reaction, index) => (
              <p key={index} className="p-2 border-b">{reaction}</p>
            ))}
            <Button onClick={() => setScreen("actions")}>New Action</Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
