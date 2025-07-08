
import { useState } from "react";
import PageLayout from "@/components/common/page-layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Languages, Globe, Edit, Save } from "lucide-react";

export default function LanguageEditor() {
  const [isLoading, setIsLoading] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState("en");

  const languages = [
    { code: "en", name: "English", flag: "🇺🇸" },
    { code: "es", name: "Spanish", flag: "🇪🇸" },
    { code: "fr", name: "French", flag: "🇫🇷" },
    { code: "de", name: "German", flag: "🇩🇪" },
  ];

  const translations = [
    { key: "common.save", en: "Save", es: "Guardar", fr: "Sauvegarder", de: "Speichern" },
    { key: "common.cancel", en: "Cancel", es: "Cancelar", fr: "Annuler", de: "Abbrechen" },
    { key: "common.edit", en: "Edit", es: "Editar", fr: "Modifier", de: "Bearbeiten" },
    { key: "common.delete", en: "Delete", es: "Eliminar", fr: "Supprimer", de: "Löschen" },
  ];

  return (
    <PageLayout
      title="Language Editor"
      description="Edit translations and language strings"
      isLoading={isLoading}
    >
      <Tabs defaultValue="translations" className="space-y-6">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="translations">Translations</TabsTrigger>
          <TabsTrigger value="languages">Languages</TabsTrigger>
        </TabsList>

        <TabsContent value="translations" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Translation Editor</CardTitle>
                  <CardDescription>Edit text translations for different languages</CardDescription>
                </div>
                <Select value={selectedLanguage} onValueChange={setSelectedLanguage}>
                  <SelectTrigger className="w-48">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {languages.map((lang) => (
                      <SelectItem key={lang.code} value={lang.code}>
                        {lang.flag} {lang.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {translations.map((translation) => (
                  <div key={translation.key} className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 border rounded-lg">
                    <div>
                      <Label className="text-sm font-medium text-gray-600">Translation Key</Label>
                      <div className="text-sm font-mono bg-gray-100 p-2 rounded mt-1">
                        {translation.key}
                      </div>
                    </div>
                    <div>
                      <Label className="text-sm font-medium text-gray-600">
                        {languages.find(l => l.code === selectedLanguage)?.name} Translation
                      </Label>
                      <Input
                        value={translation[selectedLanguage as keyof typeof translation] as string}
                        className="mt-1"
                        placeholder="Enter translation"
                      />
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-6">
                <Button>
                  <Save className="w-4 h-4 mr-2" />
                  Save Translations
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="languages" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {languages.map((language) => (
              <Card key={language.code}>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <span className="text-2xl">{language.flag}</span>
                    {language.name}
                  </CardTitle>
                  <CardDescription>Language code: {language.code}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      <Edit className="w-4 h-4 mr-2" />
                      Edit
                    </Button>
                    <Button variant="outline" size="sm">
                      <Globe className="w-4 h-4 mr-2" />
                      Export
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </PageLayout>
  );
}
