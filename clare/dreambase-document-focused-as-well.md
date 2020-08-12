
Jag tror att det vore KLOKT att också tänka dokument-databas-aktigt, dvs uppmuntra till komplexa strukturer när relationer egentligen inte behövs. Om så, behöver vi kunna ha references långt ned i strukturen (alltså typ foreign keys). Inte parent/child i understruktur. Det vore ologiskt. Inte heller grafer, eftersom det är jobbigare att Edges-tabellen även skulle behöva innehålla en keyPath i både sourse och destination - en keyPath som kan invalidiseras när datat ändras.

Exempel

```ts
interface Course {
  courseBlocks: CourseBlock[];
}

interface CourseBlock {
  courseTabs: CourseTab[];
}

interface CourseTab {
  contents: Content[];
}

type Content = TaskContent | YoutubeContent | TextContent;

interface TaskContent {
  tasks: Reference<Task>[];
}
// alternativt:
interface TaskContent {
  tasks: ReferenceArray<Task>;
}

```

Om ett task raderas så bör en ReferenceArray förlora pekaren.

Ett annat sätt att deklarera Course här:

```ts
interface Course {
  courseBlocks: Array<{
    courseTabs: Array<{
      contents: Array<Content>
    }
  }
}
```

Observera att detta är en tanke och egentligen ett specialfall. Det skulle troligen optimera hämtningar av dokumentet eftersom det inte behövs några joins för att hitta relaterat innehåll. Men det ställer till komplexiteten lite. Och man måste alltid tänka en extra gång vilken modell man vill använda.

Ett annat angreppsätt är att INTE tillåta komplexa strukturer i första versionen. Då kanske vi inte kan kalla det en äkta dokument-databas, utan bara relations/graph kombo.

I så fall blir det extra viktigt med branch-support (vilket det kanske blir ändå)

I det ultimata fallet hade den hanterat dokumentmodellen och att det hade varit busenkelt att konvertera mellan, tex att ändra CourseBlock att bli en entitet med eget id och ändra courseBlocks till Children<CourseBlock>. Ja just det! Children<CourseBlock>! Det kommer ju gör att joins inte behövs! Kan vi från kompilerat jsxQuery() se att hela suubträdet navigeras så kan vi ställa frågan med ett query och få hela subträdet!

Vad är egentligen teoretiska skillnaden mellan komplex dokument och hierarki? I praktiken typ samma sak. Fördelen med hierarki är att varje nod har ID och man kan börja på valfri nod och den kan ha grafer hur som helst. Enkelhet i ramverksimplementation. En fördelen med dokument är dock att ordningen på children kan avgöras av JSON strukturen, medan i Children fallet kommer ordningen i den ordning objekten skapades (id) by default. Vill man kunna arrangera om måste man ha nån form av childOrder: number på barn-objektet.

